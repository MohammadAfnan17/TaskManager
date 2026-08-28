import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { X, Calendar, Tag, AlertCircle } from 'lucide-react';

export const TaskModal = () => {
  const { isModalOpen, closeModal, editingTask, createTask, updateTask } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    category: '',
    dueDate: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'TODO',
        priority: editingTask.priority || 'MEDIUM',
        category: editingTask.category || '',
        dueDate: editingTask.dueDate || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        category: '',
        dueDate: '',
      });
    }
    setError('');
  }, [editingTask, isModalOpen]);

  if (!isModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Task title is required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
      } else {
        await createTask(formData);
      }
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save task. Please check input.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
          <button className="modal-close-btn" onClick={closeModal}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="modal-error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Design Landing Page Banner"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Add detailed task instructions or notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Category / Tag</label>
              <div className="input-icon-wrapper">
                <Tag size={16} className="input-icon" />
                <input
                  type="text"
                  className="form-input with-icon"
                  placeholder="e.g. Frontend, Backend, UI/UX"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <div className="input-icon-wrapper">
                <Calendar size={16} className="input-icon" />
                <input
                  type="date"
                  className="form-input with-icon"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>

        <style>{`
          .modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(6px);
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: fadeIn 0.2s ease-out;
          }
          .modal-content {
            width: 100%;
            max-width: 540px;
            background: var(--bg-modal);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 1.75rem;
            box-shadow: var(--shadow-lg);
          }
          .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.25rem;
          }
          .modal-title {
            font-family: var(--font-heading);
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
          }
          .modal-close-btn {
            color: var(--text-muted);
            padding: 0.35rem;
            border-radius: var(--radius-sm);
            transition: all var(--transition-fast);
          }
          .modal-close-btn:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .modal-error-alert {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.25);
            color: #ef4444;
            border-radius: var(--radius-md);
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }
          .modal-form {
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }
          .form-label {
            font-size: 0.82rem;
            font-weight: 600;
            color: var(--text-secondary);
          }
          .form-input, .form-textarea, .form-select {
            padding: 0.65rem 0.85rem;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            font-size: 0.9rem;
            color: var(--text-primary);
            transition: all var(--transition-fast);
          }
          .form-input:focus, .form-textarea:focus, .form-select:focus {
            outline: none;
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          }
          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .input-icon-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .input-icon {
            position: absolute;
            left: 10px;
            color: var(--text-muted);
            pointer-events: none;
          }
          .form-input.with-icon {
            padding-left: 2.2rem;
            width: 100%;
          }
          .modal-footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.75rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border-color);
          }
          .btn-secondary {
            padding: 0.6rem 1.1rem;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            border-radius: var(--radius-md);
            font-weight: 600;
            font-size: 0.88rem;
          }
          .btn-secondary:hover { background: var(--border-color); color: var(--text-primary); }
          .btn-primary {
            padding: 0.6rem 1.25rem;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
            color: white;
            border-radius: var(--radius-md);
            font-weight: 600;
            font-size: 0.88rem;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          }
          .btn-primary:hover { transform: translateY(-1px); }

          @media (max-width: 580px) {
            .form-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </div>
  );
};
