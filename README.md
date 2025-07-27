# 📁 Task  Management CMS (MERN Stack)

A robust role-based CMS for managing projects and tasks collaboratively. Built with the **MERN stack** and includes features like Google OAuth, JWT authentication, role-based dashboards, and conditional UI rendering for Admin, Manager, and Member roles.

---

## ⚙️ Tech Stack

| Layer     | Technology                                         |
|-----------|----------------------------------------------------|
| Frontend  | Next.js, Bootstrap, Redux Toolkit, React Router DOM |
| Backend   | Node.js, Express.js, MongoDB, Mongoose             |
| Auth      | Google OAuth 2.0, JWT                              |
| Styling   | Bootstrap                                          |
| Tools     | Postman, npm                                       |
| Node.js   | **v20.19.1**                                       |

---

## ✅ Features Overview

### 🌐 Frontend (Next.js)

- ✅ Google OAuth 2.0 Login via `@react-oauth/google`
- ✅ Login & Register pages with link navigation
- ✅ Redux Toolkit for user state management and persistence
- ✅ Protected routes using JWT
- ✅ Role-based access UI rendering:
  - **Admin**: Can create projects and tasks
  - **Manager**: Can create/update tasks
  - **Member**: View only assigned tasks
- ✅ Task Management:
  - Create Task Modal (Admin/Manager)
  - Update Task Modal (Manager)
  - Task Detail View (All roles)
- ✅ Create Project Button (Admin only)
- ✅ Logout functionality
- ✅ Toast notifications for feedback
- ✅ Loader while authenticating with Google
- ✅Kanban board for task visualization
- ✅ `.env.example` for variables
- ✅ Logout functionality

### 🧠 Backend (Node.js + Express)

- ✅ Google OAuth login integration
🔐 JWT-based Authentication (Login/Register)
- ✅ JWT-based token authentication and verification
👥 Role-based Authorization (Admin, Manager, Member)
- ✅ RESTful APIs for:
  - User Management
  - Project Management
  - Task CRUD Operations
- ✅ Mongoose Models for Users, Projects, and Tasks
- ✅ Proper error handling and route structure
✅ Task CRUD Operations (Linked to Projects)
🔄 Populate references (e.g., users, assignedTo)
🔍 Task & Project Pagination, Search, and Status Filter
✅ Batch Task Updates (Bulk)
- 📬 Cron Job to Send Email for Overdue Tasks
 Nodemailer for emails
📄 Centralized Error Handling
📦 Environment Variables Support
🔐 Secure Password Hashing (bcrypt)
📄 API Documentation via Postman Collection 

---

## 🚧 Pending Features

### 🔧 Frontend Improvements

- [ ] Dark / Light Mode Toggle
- [ ] Task Filtering and Search pagination
- [ ] Project and  task crud functionality
- [ ] Export project tasks as a CSV or PDF report.

---





📂 [Download Postman Collection](./Postman/Task_Management_API.postman_collection.json)

