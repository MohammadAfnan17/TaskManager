import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Search, Filter, LayoutGrid, List, RotateCcw } from 'lucide-react';

export const TaskFilter = () => {
  const { filters, setFilters, viewMode, setViewMode } = useTasks();

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    setFilters((prev) => ({ ...prev, priority: e.target.value }));
  };

  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const resetFilters = () => {
    setFilters({
      status: 'ALL',
      priority: 'ALL',
      category: '',
      search: '',
    });
  };

  const hasActiveFilters = filters.status !== 'ALL' || filters.priority !== 'ALL' || filters.category || filters.search;

  return (
    <div className="filter-bar-container glass-panel">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks by title or description..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-selects">
        <div className="select-wrapper">
          <Filter size={14} className="select-icon" />
          <select value={filters.status} onChange={handleStatusChange} className="filter-select">
            <option value="ALL">All Statuses</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="select-wrapper">
          <select value={filters.priority} onChange={handlePriorityChange} className="filter-select">
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <input
          type="text"
          className="category-filter-input"
          placeholder="Filter by Category"
          value={filters.category}
          onChange={handleCategoryChange}
        />

        {hasActiveFilters && (
          <button className="reset-filter-btn" onClick={resetFilters} title="Reset all filters">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="view-mode-toggle">
        <button
          className={`mode-btn ${viewMode === 'board' ? 'active' : ''}`}
          onClick={() => setViewMode('board')}
          title="Kanban Board View"
        >
          <LayoutGrid size={18} />
        </button>
        <button
          className={`mode-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
          title="List Table View"
        >
          <List size={18} />
        </button>
      </div>

      <style>{`
        .filter-bar-container {
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 240px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.4rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          transition: all var(--transition-fast);
        }
        .search-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .filter-selects {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .select-icon {
          position: absolute;
          left: 10px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .filter-select, .category-filter-input {
          padding: 0.6rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .filter-select {
          padding-left: 2rem;
          cursor: pointer;
        }
        .filter-select:hover, .category-filter-input:hover {
          border-color: var(--border-color-hover);
        }
        .filter-select:focus, .category-filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }
        .reset-filter-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 0.85rem;
          color: var(--accent-secondary);
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.2);
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        .reset-filter-btn:hover {
          background: rgba(236, 72, 153, 0.2);
        }
        .view-mode-toggle {
          display: flex;
          background: var(--bg-tertiary);
          padding: 0.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          margin-left: auto;
        }
        .mode-btn {
          padding: 0.45rem;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .mode-btn:hover {
          color: var(--text-primary);
        }
        .mode-btn.active {
          background: var(--bg-card);
          color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 768px) {
          .view-mode-toggle { margin-left: 0; }
        }
      `}</style>
    </div>
  );
};
