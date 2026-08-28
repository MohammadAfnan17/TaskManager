import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWebSocket } from '../context/WebSocketContext';
import { useTasks } from '../context/TaskContext';
import { CheckSquare, Moon, Sun, LogOut, Plus, Wifi, WifiOff, Menu } from 'lucide-react';

export const Navbar = ({ onToggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { connected } = useWebSocket();
  const { openCreateModal } = useTasks();

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="nav-left">
          <button className="mobile-menu-btn" onClick={onToggleMobileSidebar} aria-label="Toggle menu">
            <Menu size={22} />
          </button>
          
          <div className="brand-logo">
            <div className="logo-icon-wrapper">
              <CheckSquare className="logo-icon" size={24} />
            </div>
            <div className="brand-text">
              <span className="brand-title">TaskFlow</span>
              <span className="brand-subtitle">Manager</span>
            </div>
          </div>

          <div className={`ws-status-badge ${connected ? 'connected' : 'disconnected'}`} title={connected ? 'Real-time WebSocket Live' : 'Reconnecting WebSocket...'}>
            {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span className="ws-text">{connected ? 'Live Sync' : 'Offline'}</span>
          </div>
        </div>

        <div className="nav-right">
          <button className="primary-action-btn" onClick={openCreateModal}>
            <Plus size={18} />
            <span className="btn-text">New Task</span>
          </button>

          <button className="icon-btn theme-toggle-btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user && (
            <div className="user-profile-menu">
              <div className="avatar-circle">
                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-info-text">
                <span className="user-name">{user.username}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button className="icon-btn logout-btn" onClick={logout} title="Sign Out">
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar-container {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
        }
        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.75rem;
          max-width: 1600px;
          margin: 0 auto;
        }
        .nav-left, .nav-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .mobile-menu-btn {
          display: none;
          color: var(--text-primary);
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logo-icon-wrapper {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 0.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-glow);
        }
        .brand-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-top: -4px;
        }
        .ws-status-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 500;
        }
        .ws-status-badge.connected {
          background: rgba(16, 185, 129, 0.12);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .ws-status-badge.disconnected {
          background: rgba(239, 68, 68, 0.12);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.25);
        }
        .primary-action-btn {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
          color: white;
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .primary-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.45);
        }
        .icon-btn {
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-left: 0.75rem;
          border-left: 1px solid var(--border-color);
        }
        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
        }
        .user-info-text {
          display: flex;
          flex-direction: column;
        }
        .user-name {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-primary);
        }
        .user-email {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block; }
          .user-info-text, .ws-status-badge { display: none; }
          .btn-text { display: none; }
          .primary-action-btn { padding: 0.55rem; }
        }
      `}</style>
    </header>
  );
};
