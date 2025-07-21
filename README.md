# 🛡️ Yash Securelytix

A full-stack secure login and dashboard application built with React (frontend) and Express.js (backend), featuring role-based authentication and dynamic data rendering for clients and employees.

## 🚀 Features

- 🔐 Secure Login with JWT Authentication
- 👥 Role-Based Dashboard for Clients and Employees
- ✅ Token Validation & Protected Routes
- 📊 Real-Time Data Fetching for Clients & Employees
- 🔁 Axios Interceptors for Token Handling
- 📦 Fully Responsive UI with React

## 📁 Project Structure

```
.
├── backend
│   ├── controllers
│   ├── data
│   ├── middleware
│   ├── routes
│   └── server.js
└── frontend
    ├── public
    └── src
        ├── components
        │   ├── Common
        │   ├── Dashboard
        │   └── Login
        ├── services
        ├── utils
        ├── App.js
        └── index.js
```

## 🔧 Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 📦 Environment Variables

Set the following environment variable either in **Render Dashboard** or in a `.env` file inside the `frontend/` folder:

```
REACT_APP_API_URL=https://yash-securelytix.onrender.com/api
```

✅ This is used in `services/api.js` to dynamically configure the Axios base URL:

```js
baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
```

📍 The backend health check endpoint:  
`https://yash-securelytix.onrender.com/api/health`

## 🔗 Live Demo

Frontend: [https://yash-securelytix-frontend.onrender.com](https://yash-securelytix-frontend.onrender.com)  
Backend: [https://yash-securelytix.onrender.com/api/health](https://yash-securelytix.onrender.com/api/health)

## 📄 License

This project is licensed under the MIT License.