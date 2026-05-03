# Task Management Web Application (MERN)

A full-stack task manager built with **MongoDB, Express.js, React.js, and Node.js**, secured with **JWT authentication**. Suitable as a Full Stack Developer Intern portfolio project.

## Features
- User signup / login / logout (JWT auth, bcrypt-hashed passwords)
- Create, read, update, delete tasks
- Task fields: title, description, priority (Low/Medium/High), deadline, status
- Filter by status: Pending, In Progress, Completed
- Search tasks by title
- Dashboard: total / completed / pending counters
- Responsive, clean modern UI
- REST APIs with proper error handling

## Tech Stack
| Layer | Tech |
|------|------|
| Frontend | React 18, React Router, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcryptjs |
| Deploy | Vercel (frontend), Render (backend), MongoDB Atlas (DB) |

## Folder Structure
```
task-manager/
├── backend/
│   ├── config/db.js
│   ├── models/{User,Task}.js
│   ├── middleware/auth.js
│   ├── controllers/{authController,taskController}.js
│   ├── routes/{auth,tasks}.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/{Navbar,TaskCard,TaskForm,PrivateRoute}.jsx
    │   ├── pages/{Login,Register,Dashboard}.jsx
    │   ├── styles/app.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── .env.example
    └── package.json
```

## Setup Instructions

### 1. Clone & install
```bash
git clone <your-repo-url> task-manager
cd task-manager
```

### 2. Backend
```bash
cd backend
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev            # http://localhost:5000
```

### 3. Frontend
```bash
cd ../frontend
cp .env.example .env   # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev            # http://localhost:5173
```

### 4. MongoDB
Use a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) and copy the connection string into `backend/.env` as `MONGO_URI`.

## REST API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | – | Create account |
| POST | `/api/auth/login` | – | Returns JWT |
| GET | `/api/tasks` | ✓ | List tasks (supports `?status=&search=`) |
| POST | `/api/tasks` | ✓ | Create task |
| PUT | `/api/tasks/:id` | ✓ | Update task |
| DELETE | `/api/tasks/:id` | ✓ | Delete task |

Send `Authorization: Bearer <token>` for protected routes.

## Deployment

### Backend → Render
1. Push repo to GitHub.
2. On [Render](https://render.com): **New → Web Service** → connect repo → root dir `backend`.
3. Build: `npm install` · Start: `npm start`.
4. Add env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL).

### Frontend → Vercel
1. On [Vercel](https://vercel.com): **New Project** → root dir `frontend`.
2. Framework: Vite. Build: `npm run build`. Output: `dist`.
3. Env var: `VITE_API_URL=https://<your-render-app>.onrender.com/api`.

## License
MIT
