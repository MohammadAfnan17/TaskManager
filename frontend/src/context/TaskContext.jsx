import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { useAuth } from './AuthContext';
import { useWebSocket } from './WebSocketContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { subscribeToTaskEvents } = useWebSocket();

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, completed: 0, completionPercentage: 0 });
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'

  // Filters State
  const [filters, setFilters] = useState({
    status: 'ALL',
    priority: 'ALL',
    category: '',
    search: '',
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await taskService.getTasks(filters);
      setTasks(data);
      const statsData = await taskService.getTaskStats();
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle WebSocket Live Sync Events
  useEffect(() => {
    if (!subscribeToTaskEvents) return;

    const unsubscribe = subscribeToTaskEvents((event) => {
      fetchTasks();
    });

    return () => unsubscribe();
  }, [subscribeToTaskEvents, fetchTasks]);

  const createTask = async (taskData) => {
    const newTask = await taskService.createTask(taskData);
    await fetchTasks();
    return newTask;
  };

  const updateTask = async (id, taskData) => {
    const updated = await taskService.updateTask(id, taskData);
    await fetchTasks();
    return updated;
  };

  const updateTaskStatus = async (id, status) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    try {
      await taskService.updateTaskStatus(id, status);
      await fetchTasks();
    } catch (err) {
      await fetchTasks(); // Revert on failure
    }
  };

  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (err) {
      await fetchTasks();
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        viewMode,
        setViewMode,
        filters,
        setFilters,
        fetchTasks,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        isModalOpen,
        editingTask,
        openCreateModal,
        openEditModal,
        closeModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
