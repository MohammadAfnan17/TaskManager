package com.taskmanager.repository;

import com.taskmanager.model.Task;
import com.taskmanager.model.TaskPriority;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserOrderByCreatedAtDesc(User user);

    @Query("SELECT t FROM Task t WHERE t.user = :user " +
           "AND (:status IS NULL OR t.status = :status) " +
           "AND (:priority IS NULL OR t.priority = :priority) " +
           "AND (:category IS NULL OR LOWER(t.category) LIKE LOWER(CONCAT('%', :category, '%'))) " +
           "AND (:search IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY t.updatedAt DESC")
    List<Task> filterTasks(@Param("user") User user,
                           @Param("status") TaskStatus status,
                           @Param("priority") TaskPriority priority,
                           @Param("category") String category,
                           @Param("search") String search);

    long countByUserAndStatus(User user, TaskStatus status);
    long countByUser(User user);
}
