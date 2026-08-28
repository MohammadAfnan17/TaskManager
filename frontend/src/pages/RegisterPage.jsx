import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Lock, User, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export const RegisterPage = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(false);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);

    try {
      await register({ username, email, password });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try a different username or email.');
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
          <h2>Create Account</h2>
          <p>Start organizing and managing tasks in real time</p>
        </div>

        {error && (
          <div className="auth-error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label>Username</label>
            <div className="auth-input-wrapper">
              <User size={18} className="auth-input-icon" />
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label>Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={submitting}>
            <span>{submitting ? 'Creating account...' : 'Get Started'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Already have an account?</span>
          <button className="switch-auth-btn" onClick={onSwitchToLogin}>
            Sign in instead
          </button>
        </div>
      </div>
    </div>
  );
};
