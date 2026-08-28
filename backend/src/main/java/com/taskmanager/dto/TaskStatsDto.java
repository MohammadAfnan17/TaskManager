package com.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatsDto {
    private long total;
    private long todo;
    private long inProgress;
    private long completed;
    private double completionPercentage;
}
