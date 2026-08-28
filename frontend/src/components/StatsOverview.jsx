import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';

export const StatsOverview = () => {
  const { stats } = useTasks();

  return (
    <div className="stats-container">
      <div className="stat-card glass-panel">
        <div className="stat-icon-wrapper total">
          <ListTodo size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon-wrapper todo">
          <Clock size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.todo}</span>
          <span className="stat-label">To Do</span>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon-wrapper in-progress">
          <TrendingUp size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon-wrapper completed">
          <CheckCircle2 size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="progress-card glass-panel">
        <div className="progress-header">
          <span className="progress-title">Overall Progress</span>
          <span className="progress-percent">{stats.completionPercentage}%</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
      </div>

      <style>{`
        .stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr) 2fr;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .stat-card {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .stat-icon-wrapper.total { background: linear-gradient(135deg, #6366f1, #4f46e5); }
        .stat-icon-wrapper.todo { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
        .stat-icon-wrapper.in-progress { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .stat-icon-wrapper.completed { background: linear-gradient(135deg, #10b981, #059669); }

        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }
        .progress-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.75rem;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .progress-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .progress-percent {
          font-family: var(--font-heading);
          font-weight: 800;
          color: var(--accent-emerald);
          font-size: 1.1rem;
        }
        .progress-bar-bg {
          height: 10px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-emerald));
          border-radius: var(--radius-full);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 1200px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .progress-card {
            grid-column: span 2;
          }
        }
        @media (max-width: 640px) {
          .stats-container {
            grid-template-columns: 1fr;
          }
          .progress-card {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};
