import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login({ username, password });
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card glass-panel">
        <div className="auth-brand">
          <div className="auth-logo-icon">
            <CheckSquare size={28} />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your TaskFlow account to manage your tasks</p>
        </div>

        {error && (
          <div className="auth-error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label>Username or Email</label>
            <div className="auth-input-wrapper">
              <User size={18} className="auth-input-icon" />
              <input
                type="text"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={submitting}>
            <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Don't have an account?</span>
          <button className="switch-auth-btn" onClick={onSwitchToRegister}>
            Create one now
          </button>
        </div>
      </div>

      <style>{`
        .auth-page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent 40%),
                      radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.1), transparent 40%),
                      var(--bg-primary);
        }
        .auth-card {
          width: 100%;
          max-width: 420px;
          padding: 2.5rem 2rem;
          background: var(--bg-modal);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .auth-brand {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .auth-logo-icon {
          width: 54px;
          height: 54px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          box-shadow: var(--shadow-glow);
        }
        .auth-brand h2 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .auth-brand p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }
        .auth-error-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #ef4444;
          border-radius: var(--radius-md);
          font-size: 0.83rem;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .auth-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .auth-form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .auth-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .auth-input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .auth-input-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.6rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }
        .auth-input-wrapper input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .auth-submit-btn {
          width: 100%;
          padding: 0.8rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
          margin-top: 0.5rem;
        }
        .auth-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
        }
        .auth-footer-link {
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }
        .switch-auth-btn {
          color: var(--accent-primary);
          font-weight: 600;
        }
        .switch-auth-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
