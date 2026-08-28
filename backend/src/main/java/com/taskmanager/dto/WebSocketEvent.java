package com.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WebSocketEvent {
    public enum EventType {
        TASK_CREATED,
        TASK_UPDATED,
        TASK_DELETED,
        STATUS_CHANGED
    }

    private EventType eventType;
    private TaskDto task;
    private Long deletedTaskId;
    private String message;
    private String triggeredBy;
}
