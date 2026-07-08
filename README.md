# Collaboardation

A full-stack Kanban project management application built with React, Express, PostgreSQL, and AWS.

Collaboardation allows users to organize projects into boards and tasks using a Trello inspired interface. The project was built to demonstrate production-style frontend architecture, REST API design, authentication, deployment, and end-to-end testing.

### Live Demo
https://collaboardation.com

### Repository
https://github.com/AmMonsoon/Collaboardation


## Features

- User authentication with secure HTTP-only JWT cookies
- Full CRUD for Projects, Boards, and Tasks
- Drag-and-drop task movement between boards
- Responsive Kanban layout
- Protected routes
- Persistent login sessions
- Project ownership and authorization
- Modal-based editing workflow
- Random pastel task colors for visual organization

---

Frontend

React
React Router
Axios
CSS
@hello-pangea/dnd
Playwright

Backend

Node.js
Express
Sequelize
PostgreSQL
JWT Authentication
REST API

Deployment

Docker
AWS ECS
AWS ECR
Application Load Balancer
Amazon RDS
Amazon S3
Amazon CloudFront

---
## Screenshots
### Login Page

### SideBar

### Kanban Board

### Drag and Drop

---

## Architecture

The frontend follows a parent-owned state architecture where container components manage application state and presentational components receive data through props.

Authentication uses HTTP-only JWT cookies with protected React routes and backend ownership validation.

The backend follows a layered architecture consisting of:

Controllers
Services
Middleware
Sequelize Models

Middleware validates authentication, resource existence, and ownership before reaching controllers.

---

## Future Improvements

- Task due dates
- Labels
- Search
- Email verification
- Password reset
- CI/CD pipeline
- Improved mobile experience

## Running the Project Locally

### Backend
```bash
cd app
npm install
npm run dev
```

### Frontend
```bash
cd collaboardation-client
npm install
npm run dev
```
Built by Alex Monson

