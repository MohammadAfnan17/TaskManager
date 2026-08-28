package com.taskmanager.controller;

import com.taskmanager.dto.TaskDto;
import com.taskmanager.dto.TaskStatsDto;
import com.taskmanager.model.TaskPriority;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) TaskPriority priority,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        List<TaskDto> tasks = taskService.getTasks(status, priority, category, search);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        try {
            TaskDto task = taskService.getTaskById(id);
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskDto taskDto) {
        try {
            TaskDto created = taskService.createTask(taskDto);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @Valid @RequestBody TaskDto taskDto) {
        try {
            TaskDto updated = taskService.updateTask(id, taskDto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateTaskStatus(@PathVariable Long id, @RequestParam TaskStatus status) {
        try {
            TaskDto updated = taskService.updateTaskStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Task deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<TaskStatsDto> getTaskStats() {
        TaskStatsDto stats = taskService.getTaskStats();
        return ResponseEntity.ok(stats);
    }
}
