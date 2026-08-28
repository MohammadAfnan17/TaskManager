import React from 'react';
import { useTasks } from '../context/TaskContext';
import { LayoutGrid, List, CheckCircle2, Clock, Circle, Filter, Tag, Plus } from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { viewMode, setViewMode, filters, setFilters, stats, openCreateModal } = useTasks();

  const handleStatusFilter = (status) => {
    setFilters((prev) => ({ ...prev, status }));
    if (onClose) onClose();
  };

  const handlePriorityFilter = (priority) => {
    setFilters((prev) => ({ ...prev, priority }));
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-section">
          <span className="section-title">Views</span>
          <div className="nav-buttons">
            <button
              className={`nav-item ${viewMode === 'board' ? 'active' : ''}`}
              onClick={() => { setViewMode('board'); if (onClose) onClose(); }}
            >
              <LayoutGrid size={18} />
              <span>Kanban Board</span>
            </button>

            <button
              className={`nav-item ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => { setViewMode('list'); if (onClose) onClose(); }}
            >
              <List size={18} />
              <span>List Table</span>
            </button>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="section-title">Status Filter</span>
          <div className="nav-buttons">
            <button
              className={`nav-item ${filters.status === 'ALL' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('ALL')}
            >
              <Filter size={16} />
              <span>All Tasks</span>
              <span className="badge-count">{stats.total}</span>
            </button>

            <button
              className={`nav-item ${filters.status === 'TODO' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('TODO')}
            >
              <Circle size={16} color="var(--status-todo)" />
              <span>To Do</span>
              <span className="badge-count">{stats.todo}</span>
            </button>

            <button
              className={`nav-item ${filters.status === 'IN_PROGRESS' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('IN_PROGRESS')}
            >
              <Clock size={16} color="var(--status-in-progress)" />
              <span>In Progress</span>
              <span className="badge-count">{stats.inProgress}</span>
            </button>

            <button
              className={`nav-item ${filters.status === 'COMPLETED' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('COMPLETED')}
            >
              <CheckCircle2 size={16} color="var(--status-completed)" />
              <span>Completed</span>
              <span className="badge-count">{stats.completed}</span>
            </button>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="section-title">Priority</span>
          <div className="nav-buttons">
            {['ALL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
              <button
                key={p}
                className={`nav-item ${filters.priority === p ? 'active' : ''}`}
                onClick={() => handlePriorityFilter(p)}
              >
                <Tag size={15} />
                <span>{p === 'ALL' ? 'Any Priority' : p.charAt(0) + p.slice(1).toLowerCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="create-task-sidebar-btn" onClick={openCreateModal}>
            <Plus size={18} />
            <span>Create New Task</span>
          </button>
        </div>

        <style>{`
          .sidebar-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 40;
          }
          .sidebar-container {
            width: 260px;
            background: var(--bg-secondary);
            border-right: 1px solid var(--border-color);
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 1.75rem;
            min-height: calc(100vh - 65px);
            transition: transform var(--transition-normal);
          }
          .sidebar-section {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .section-title {
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            padding: 0 0.5rem;
          }
          .nav-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .nav-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.65rem 0.85rem;
            border-radius: var(--radius-md);
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 500;
            transition: all var(--transition-fast);
            width: 100%;
            text-align: left;
          }
          .nav-item:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
          }
          .nav-item.active {
            background: var(--glass-bg);
            border: 1px solid var(--border-color-hover);
            color: var(--accent-primary);
            font-weight: 600;
          }
          .badge-count {
            margin-left: auto;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            font-size: 0.75rem;
            padding: 0.15rem 0.5rem;
            border-radius: var(--radius-full);
          }
          .nav-item.active .badge-count {
            background: var(--accent-primary);
            color: white;
          }
          .sidebar-footer {
            margin-top: auto;
            padding-top: 1rem;
            border-top: 1px solid var(--border-color);
          }
          .create-task-sidebar-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: var(--bg-tertiary);
            border: 1px dashed var(--accent-primary);
            color: var(--accent-primary);
            border-radius: var(--radius-md);
            font-weight: 600;
            transition: all var(--transition-fast);
          }
          .create-task-sidebar-btn:hover {
            background: var(--accent-primary);
            color: white;
          }
          @media (max-width: 768px) {
            .sidebar-container {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              z-index: 50;
              transform: translateX(-100%);
              height: 100vh;
            }
            .sidebar-container.open {
              transform: translateX(0);
            }
          }
        `}</style>
      </aside>
    </>
  );
};
