# Task Management Application 🚀

A modern full-stack task management application with real-time updates, secure authentication, interactive Kanban/List views, and responsive design.

---

## 🛠 Tech Stack

- **Frontend**: React JS (Vite), Modern Vanilla CSS with Dark/Light Themes, Lucide Icons, SockJS & STOMP WebSockets
- **Backend**: Spring Boot 3.x, Spring Security, JWT (JSON Web Tokens), Spring Data JPA, WebSockets (STOMP Broker)
- **Database**: MySQL 8.0 containerized via Docker (with automatic fallback to H2 in-memory DB for local testing)

---

## 🚀 Quick Start Guide

### 1. Database (MySQL via Docker)
To pull and start the MySQL Docker container:
```bash
docker compose up -d
```
> **Database Credentials**:
> - Host: `localhost:3306`
> - Database: `taskmanager_db`
> - Username: `taskuser` / Password: `taskpassword` (Root: `rootpassword`)

---

### 2. Backend Setup (Spring Boot)
Navigate to the `backend` directory and launch the server:
```bash
cd backend
./mvnw spring-boot:run
```
*(On Windows PowerShell, use `.\mvnw.cmd spring-boot:run`)*

The Spring Boot backend will run on `http://localhost:8080`.

---

### 3. Frontend Setup (React JS)
Navigate to the `frontend` directory, install dependencies, and start Vite:
```bash
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## ✨ Features

1. **Authentication & Authorization**:
   - Secure user registration and login using JWT.
   - Password encryption with BCrypt.
   - Protected REST endpoints & socket sessions.

2. **Task Operations (CRUD)**:
   - Create, edit, delete, and view tasks.
   - Filter by status (`TODO`, `IN_PROGRESS`, `COMPLETED`), priority (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), and category tags.
   - Real-time search filter across titles and descriptions.

3. **Views & Visualizations**:
   - **Kanban Board**: Drag-and-drop / single-click status workflow.
   - **List View**: Structured table format for batch management.
   - **Metrics Overview**: Real-time progress bar and task counters.

4. **Real-time WebSockets**:
   - Live synchronization across devices/tabs when tasks are created, modified, or deleted.

5. **Responsive & Aesthetic UI**:
   - Dark Mode / Light Mode toggle.
   - Glassmorphism design elements & smooth micro-animations.
   - Mobile navigation sidebar & responsive drawer support.
