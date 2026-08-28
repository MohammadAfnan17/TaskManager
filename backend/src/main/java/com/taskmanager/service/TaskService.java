package com.taskmanager.service;

import com.taskmanager.dto.TaskDto;
import com.taskmanager.dto.TaskStatsDto;
import com.taskmanager.dto.WebSocketEvent;
import com.taskmanager.model.Task;
import com.taskmanager.model.TaskPriority;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.model.User;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public List<TaskDto> getTasks(TaskStatus status, TaskPriority priority, String category, String search) {
        User currentUser = authService.getCurrentUser();
        List<Task> tasks = taskRepository.filterTasks(currentUser, status, priority, category, search);
        return tasks.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public TaskDto getTaskById(Long id) {
        User currentUser = authService.getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied: Task belongs to another user");
        }

        return mapToDto(task);
    }

    @Transactional
    public TaskDto createTask(TaskDto taskDto) {
        User currentUser = authService.getCurrentUser();

        Task task = Task.builder()
                .title(taskDto.getTitle())
                .description(taskDto.getDescription())
                .status(taskDto.getStatus() != null ? taskDto.getStatus() : TaskStatus.TODO)
                .priority(taskDto.getPriority() != null ? taskDto.getPriority() : TaskPriority.MEDIUM)
                .category(taskDto.getCategory())
                .dueDate(taskDto.getDueDate())
                .user(currentUser)
                .build();

        Task savedTask = taskRepository.save(task);
        TaskDto responseDto = mapToDto(savedTask);

        broadcastEvent(WebSocketEvent.EventType.TASK_CREATED, responseDto, null, "New task created: " + savedTask.getTitle());
        return responseDto;
    }

    @Transactional
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        User currentUser = authService.getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied: Task belongs to another user");
        }

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        if (taskDto.getStatus() != null) task.setStatus(taskDto.getStatus());
        if (taskDto.getPriority() != null) task.setPriority(taskDto.getPriority());
        task.setCategory(taskDto.getCategory());
        task.setDueDate(taskDto.getDueDate());

        Task updatedTask = taskRepository.save(task);
        TaskDto responseDto = mapToDto(updatedTask);

        broadcastEvent(WebSocketEvent.EventType.TASK_UPDATED, responseDto, null, "Task updated: " + updatedTask.getTitle());
        return responseDto;
    }

    @Transactional
    public TaskDto updateTaskStatus(Long id, TaskStatus status) {
        User currentUser = authService.getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied: Task belongs to another user");
        }

        task.setStatus(status);
        Task updatedTask = taskRepository.save(task);
        TaskDto responseDto = mapToDto(updatedTask);

        broadcastEvent(WebSocketEvent.EventType.STATUS_CHANGED, responseDto, null, "Task status moved to " + status);
        return responseDto;
    }

    @Transactional
    public void deleteTask(Long id) {
        User currentUser = authService.getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied: Task belongs to another user");
        }

        taskRepository.delete(task);

        broadcastEvent(WebSocketEvent.EventType.TASK_DELETED, null, id, "Task deleted");
    }

    public TaskStatsDto getTaskStats() {
        User currentUser = authService.getCurrentUser();
        long total = taskRepository.countByUser(currentUser);
        long todo = taskRepository.countByUserAndStatus(currentUser, TaskStatus.TODO);
        long inProgress = taskRepository.countByUserAndStatus(currentUser, TaskStatus.IN_PROGRESS);
        long completed = taskRepository.countByUserAndStatus(currentUser, TaskStatus.COMPLETED);

        double completionPercentage = total > 0 ? ((double) completed / total) * 100 : 0.0;

        return TaskStatsDto.builder()
                .total(total)
                .todo(todo)
                .inProgress(inProgress)
                .completed(completed)
                .completionPercentage(Math.round(completionPercentage * 10.0) / 10.0)
                .build();
    }

    private void broadcastEvent(WebSocketEvent.EventType eventType, TaskDto task, Long deletedTaskId, String message) {
        try {
            User currentUser = authService.getCurrentUser();
            WebSocketEvent event = WebSocketEvent.builder()
                    .eventType(eventType)
                    .task(task)
                    .deletedTaskId(deletedTaskId)
                    .message(message)
                    .triggeredBy(currentUser.getUsername())
                    .build();

            messagingTemplate.convertAndSend("/topic/tasks", event);
        } catch (Exception e) {
            // Ignore websocket notification failure gracefully if not connected
        }
    }

    private TaskDto mapToDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .category(task.getCategory())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .userId(task.getUser().getId())
                .username(task.getUser().getUsername())
                .build();
    }
}
