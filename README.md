# Collaboardation

Collaboardation is a full-stack project management application built to demonstrate real-world frontend and backend architecture patterns. The project focuses on clean state ownership, predictable data flow, secure authentication, and scalable UI composition.


## ✨ Features

### Projects
- Create, rename, and delete projects
- Projects are scoped to the authenticated user
- Active project is synced with the URL (`/projects/:projectId`)
- Locked project behavior to prevent invalid UI states

### Sidebar Architecture
- Sidebar owns all project state
- Active project derived from route, not duplicated state
- Persistent sidebar layout using React Router `<Outlet />`
- Action menus with controlled event propagation

### Modals
- Create / Rename / Delete project modals
- Rendered using React Portals
- Close on backdrop click
- Close on `Escape` key (custom reusable hook)
- Only one modal allowed open at a time

### Authentication
- JWT-based authentication
- Protected routes via `RequireAuth`
- User context derived from token, not client state
- Backend enforces ownership on all protected resources

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Custom Hooks
- CSS (no UI framework)
- REST API integration

### Backend
- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- JWT Authentication

---

## 🏗 Architecture & Design Decisions

### State Ownership Rules
- Parent components own data
- Child components emit intent via callbacks
- Modals are “dumb”:
  - No API calls
  - No routing
  - No state ownership
  - Receive data + callbacks only

### Routing Strategy
- `/projects/:projectId` is the source of truth
- UI state derives from URL, not duplicated React state
- Sidebar stays mounted while main content switches

### Event Propagation Control
- Sidebar list items handle navigation
- Action buttons explicitly stop propagation
- Prevents accidental navigation during UI actions

### Reusable Escape Key Hook
- Centralized keyboard handling
- Prevents duplicated logic across modals
- Automatically cleans up event listeners

---

## 📁 Project Structure
collaboardation/
├─ app/                     # Backend (Express + Sequelize)
├─ collaboardation-client/   # Frontend (React)
│  ├─ components/
│  │  ├─ Sidebar/
│  │  ├─ Modals/
│  │  └─ Layout/
│  ├─ hooks/
│  └─ api/
├─ README.md


---

## 🚀 Running the Project Locally

### Backend
```bash
cd app
npm install
npm run dev

### Frontend
cd collaboardation-client
npm install
npm run dev

📝 Author
Built by Alex Monson

