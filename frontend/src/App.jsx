import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { StatsOverview } from './components/StatsOverview';
import { TaskFilter } from './components/TaskFilter';
import { TaskBoard } from './components/TaskBoard';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { ToastContainer } from './components/Toast';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const DashboardContent = () => {
  const { viewMode } = useTasks();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
      <div className="main-layout">
        <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
        <main className="content-area">
          <StatsOverview />
          <TaskFilter />
          {viewMode === 'board' ? <TaskBoard /> : <TaskList />}
        </main>
      </div>
      <TaskModal />
      <ToastContainer />
    </div>
  );
};

const MainAppFlow = () => {
  const { isAuthenticated, loading } = useAuth();
  const [authPage, setAuthPage] = useState('login');

  if (loading) {
    return (
      <div className="app-loading-screen">
        <div className="spinner" />
        <p>Loading TaskFlow...</p>
        <style>{`
          .app-loading-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            color: var(--text-muted);
            background: var(--bg-primary);
          }
          .spinner {
            width: 36px;
            height: 36px;
            border: 3px solid var(--border-color);
            border-top-color: var(--accent-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return authPage === 'login' ? (
      <LoginPage onSwitchToRegister={() => setAuthPage('register')} />
    ) : (
      <RegisterPage onSwitchToLogin={() => setAuthPage('login')} />
    );
  }

  return (
    <WebSocketProvider>
      <TaskProvider>
        <DashboardContent />
      </TaskProvider>
    </WebSocketProvider>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainAppFlow />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
