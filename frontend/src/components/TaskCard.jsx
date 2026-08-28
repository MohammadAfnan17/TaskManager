import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Calendar, Edit2, Trash2, Tag, CheckCircle2, Clock, Circle } from 'lucide-react';

export const TaskCard = ({ task }) => {
  const { updateTaskStatus, deleteTask, openEditModal } = useTasks();

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'URGENT': return 'priority-badge urgent';
      case 'HIGH': return 'priority-badge high';
      case 'MEDIUM': return 'priority-badge medium';
      case 'LOW': return 'priority-badge low';
      default: return 'priority-badge medium';
    }
  };

  const handleNextStatus = () => {
    if (task.status === 'TODO') updateTaskStatus(task.id, 'IN_PROGRESS');
    else if (task.status === 'IN_PROGRESS') updateTaskStatus(task.id, 'COMPLETED');
    else if (task.status === 'COMPLETED') updateTaskStatus(task.id, 'TODO');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'TODO': return <Circle size={16} color="var(--status-todo)" />;
      case 'IN_PROGRESS': return <Clock size={16} color="var(--status-in-progress)" />;
      case 'COMPLETED': return <CheckCircle2 size={16} color="var(--status-completed)" />;
      default: return <Circle size={16} />;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`task-card glass-panel ${task.status === 'COMPLETED' ? 'completed-card' : ''}`}>
      <div className="card-top-row">
        <span className={getPriorityBadgeClass(task.priority)}>
          {task.priority}
        </span>
        {task.category && (
          <span className="category-tag">
            <Tag size={12} />
            {task.category}
          </span>
        )}
        <div className="card-actions">
          <button className="card-action-btn edit" onClick={() => openEditModal(task)} title="Edit Task">
            <Edit2 size={15} />
          </button>
          <button className="card-action-btn delete" onClick={() => deleteTask(task.id)} title="Delete Task">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <h4 className="task-title">{task.title}</h4>
      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="card-footer">
        <button className="status-toggle-btn" onClick={handleNextStatus} title="Click to cycle status">
          {getStatusIcon(task.status)}
          <span className="status-label">{task.status.replace('_', ' ')}</span>
        </button>

        {task.dueDate && (
          <div className="due-date-wrapper" title={`Due Date: ${task.dueDate}`}>
            <Calendar size={14} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      <style>{`
        .task-card {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }
        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }
        .task-card.completed-card {
          opacity: 0.8;
          background: rgba(16, 185, 129, 0.03);
        }
        .card-top-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .priority-badge {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .priority-badge.urgent { background: var(--priority-urgent-bg); color: var(--priority-urgent-text); }
        .priority-badge.high { background: var(--priority-high-bg); color: var(--priority-high-text); }
        .priority-badge.medium { background: var(--priority-medium-bg); color: var(--priority-medium-text); }
        .priority-badge.low { background: var(--priority-low-bg); color: var(--priority-low-text); }

        .category-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .card-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .task-card:hover .card-actions {
          opacity: 1;
        }
        .card-action-btn {
          padding: 0.3rem;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .card-action-btn.edit:hover { color: var(--accent-primary); background: var(--bg-tertiary); }
        .card-action-btn.delete:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); }

        .task-title {
          font-size: 0.98rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
        }
        .completed-card .task-title {
          text-decoration: line-through;
          color: var(--text-muted);
        }
        .task-desc {
          font-size: 0.83rem;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.4rem;
          padding-top: 0.6rem;
          border-top: 1px solid var(--border-color);
        }
        .status-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          transition: background var(--transition-fast);
        }
        .status-toggle-btn:hover {
          background: var(--border-color);
        }
        .status-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: capitalize;
        }
        .due-date-wrapper {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
