import React from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from './TaskCard';
import { Plus, Circle, Clock, CheckCircle2 } from 'lucide-react';

export const TaskBoard = () => {
  const { tasks, loading, openCreateModal } = useTasks();

  const todoTasks = tasks.filter((t) => t.status === 'TODO');
  const inProgressTasks = tasks.filter((t) => t.status === 'IN_PROGRESS');
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');

  const columns = [
    { id: 'TODO', title: 'To Do', icon: <Circle size={18} color="var(--status-todo)" />, tasks: todoTasks },
    { id: 'IN_PROGRESS', title: 'In Progress', icon: <Clock size={18} color="var(--status-in-progress)" />, tasks: inProgressTasks },
    { id: 'COMPLETED', title: 'Completed', icon: <CheckCircle2 size={18} color="var(--status-completed)" />, tasks: completedTasks },
  ];

  if (loading && tasks.length === 0) {
    return (
      <div className="board-loading">
        <div className="spinner" />
        <span>Loading tasks...</span>
      </div>
    );
  }

  return (
    <div className="board-container">
      {columns.map((col) => (
        <div key={col.id} className="board-column glass-panel">
          <div className="column-header">
            <div className="column-header-left">
              {col.icon}
              <h3 className="column-title">{col.title}</h3>
              <span className="column-count">{col.tasks.length}</span>
            </div>
            <button className="column-add-btn" onClick={openCreateModal} title={`Add ${col.title} Task`}>
              <Plus size={16} />
            </button>
          </div>

          <div className="column-tasks-list">
            {col.tasks.length === 0 ? (
              <div className="empty-column-state">
                <span>No tasks in this stage</span>
              </div>
            ) : (
              col.tasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </div>
      ))}

      <style>{`
        .board-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: start;
        }
        .board-column {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-height: 500px;
          background: rgba(18, 24, 38, 0.4);
        }
        .column-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }
        .column-header-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .column-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .column-count {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
        }
        .column-add-btn {
          color: var(--text-muted);
          padding: 0.35rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .column-add-btn:hover {
          color: var(--accent-primary);
          background: var(--bg-tertiary);
        }
        .column-tasks-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex: 1;
        }
        .empty-column-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 120px;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          font-size: 0.82rem;
        }
        .board-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          gap: 1rem;
          color: var(--text-muted);
        }
        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-color);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 960px) {
          .board-container {
            grid-template-columns: 1fr;
          }
          .board-column {
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
};
