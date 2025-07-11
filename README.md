# 🔐 JWT Authentication Demo

This is a full-stack demo application showcasing JWT (JSON Web Token) authentication using:

* **Frontend**: React.js
* **Backend**: Node.js + Express
* **Database**: MySQL

It demonstrates user registration, login, protected routes, and token-based session management.

---

## ⚙️ Features

* ✅ User login
* ✅ Password hashing using bcrypt
* ✅ JWT token generation & verification
* ✅ Access protected routes
* ✅ React frontend integration
* ✅ MySQL persistent storage

---

## 🚀 Getting Started

### Prerequisites

* Node.js >= 14
* MySQL
* npm / yarn

---

### 🛠 Backend Setup (Node + Express + MySQL)

1. Go to the `backend/` directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node server.js
```

The backend will run on `http://localhost:5000`

---

### 💻 Frontend Setup (React)

1. Go to the `client/` directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

---

## 🔐 Authentication Flow

1. **Login**: On login, a JWT token is issued (POST `/login`).
2. **Access Protected Routes**: Token is sent via `Authorization: Bearer <token>` header.
3. **Logout**: Frontend deletes token (optional, since JWT is stateless).

---

## 🗃️ Database Schema (Example)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📬 API Endpoints

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | /api/register  | Register user      |
| POST   | /api/login     | Authenticate user  |
| GET    | /api/protected | Protected endpoint |

---

## 🧪 Test Credentials (Optional)

You can use these dummy credentials to test the app:

```bash
Email: test@example.com
Password: password123
```

---

## 📌 TODO (Optional Enhancements)

* 🔄 Refresh tokens
* 🔐 Role-based access control
* 🧪 Unit & integration tests
* ☁️ Deploy on cloud (Vercel, Render, etc.)

---

## 📝 License

MIT License. Feel free to use and modify.
