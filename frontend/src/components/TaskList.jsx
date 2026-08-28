import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Edit2, Trash2, Tag, Calendar } from 'lucide-react';

export const TaskList = () => {
  const { tasks, loading, updateTaskStatus, deleteTask, openEditModal } = useTasks();

  if (loading && tasks.length === 0) {
    return <div className="list-loading">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-list-panel glass-panel">
        <p>No tasks match the current search & filters.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive-wrapper glass-panel">
      <table className="task-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Task Title</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Due Date</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={task.status === 'COMPLETED' ? 'row-completed' : ''}>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  className={`status-select ${task.status.toLowerCase()}`}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </td>
              <td>
                <div className="title-col">
                  <span className="task-row-title">{task.title}</span>
                  {task.description && <span className="task-row-desc">{task.description}</span>}
                </div>
              </td>
              <td>
                <span className={`priority-pill ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>
              <td>
                {task.category ? (
                  <span className="category-pill">
                    <Tag size={12} /> {task.category}
                  </span>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
              <td>
                {task.dueDate ? (
                  <div className="due-date-cell">
                    <Calendar size={14} />
                    <span>{task.dueDate}</span>
                  </div>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
              <td className="text-right">
                <div className="table-actions">
                  <button className="icon-btn edit" onClick={() => openEditModal(task)} title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="icon-btn delete" onClick={() => deleteTask(task.id)} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .table-responsive-wrapper {
          overflow-x: auto;
          padding: 0.5rem;
        }
        .task-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }
        .task-table th {
          padding: 1rem;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-color);
        }
        .task-table td {
          padding: 0.9rem 1rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary);
        }
        .row-completed .task-row-title {
          text-decoration: line-through;
          color: var(--text-muted);
        }
        .task-row-title {
          font-weight: 600;
          color: var(--text-primary);
          display: block;
        }
        .task-row-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
          max-width: 350px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .status-select {
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          cursor: pointer;
        }
        .status-select.todo { color: var(--status-todo); }
        .status-select.in_progress { color: var(--status-in-progress); }
        .status-select.completed { color: var(--status-completed); }

        .priority-pill {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }
        .priority-pill.urgent { background: var(--priority-urgent-bg); color: var(--priority-urgent-text); }
        .priority-pill.high { background: var(--priority-high-bg); color: var(--priority-high-text); }
        .priority-pill.medium { background: var(--priority-medium-bg); color: var(--priority-medium-text); }
        .priority-pill.low { background: var(--priority-low-bg); color: var(--priority-low-text); }

        .category-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          background: var(--bg-tertiary);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .due-date-cell {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
        }
        .text-right { text-align: right; }
        .table-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .empty-list-panel {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
