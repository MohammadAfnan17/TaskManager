package com.taskmanager.dto;

import com.taskmanager.model.TaskPriority;
import com.taskmanager.model.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private String category;
    private LocalDate dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long userId;
    private String username;
}
