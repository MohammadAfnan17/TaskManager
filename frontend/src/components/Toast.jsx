import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { Bell, X, CheckCircle, RefreshCw, Trash, PlusCircle } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useWebSocket();

  if (!toasts || toasts.length === 0) return null;

  const getToastIcon = (type) => {
    switch (type) {
      case 'TASK_CREATED': return <PlusCircle size={18} color="#10b981" />;
      case 'TASK_UPDATED': return <RefreshCw size={18} color="#3b82f6" />;
      case 'STATUS_CHANGED': return <CheckCircle size={18} color="#8b5cf6" />;
      case 'TASK_DELETED': return <Trash size={18} color="#ef4444" />;
      default: return <Bell size={18} color="#6366f1" />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item glass-panel">
          <div className="toast-icon">{getToastIcon(toast.type)}</div>
          <div className="toast-body">
            <span className="toast-msg">{toast.message}</span>
            {toast.user && <span className="toast-user">Triggered by {toast.user}</span>}
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 200;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 360px;
          width: 100%;
        }
        .toast-item {
          padding: 0.9rem 1.1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: var(--bg-modal);
          border: 1px solid var(--border-color-hover);
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-md);
          animation: slideInRight 0.3s ease-out;
        }
        .toast-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .toast-msg {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .toast-user {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }
        .toast-close {
          color: var(--text-muted);
          padding: 0.2rem;
          border-radius: var(--radius-sm);
        }
        .toast-close:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
