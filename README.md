📝 Todo App PERN(PostgreSQL, Express, React, Node) stack

A full-stack Todo application where users can sign up, log in, and manage their personal todos. Each user can only see and manage their own tasks.

🚀 Features
🔐 User Authentication (Signup & Login)
🧾 Create, Read, Update, Delete (CRUD) Todos
👤 User-specific todos (data isolation)
💾 Persistent login using localStorage
⚡ Fast frontend using React + Vite
🗄️ PostgreSQL database for reliable storage
🛠️ Tech Stack
Frontend
React (Vite)
CSS
Backend
Node.js
Express.js
Database
PostgreSQL
📂 Project Structure
client/
│── src/
│   ├── assets/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Home.css
│   │   ├── Auth.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
│── index.html
│── package.json
│── vite.config.js

server/
│── db.js
│── index.js
│── database.sql
│── .env
│── package.json
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/todo-app.git
cd todo-app
2️⃣ Setup Backend
cd server
npm install
Create .env file
PORT=5000
DATABASE_URL=your_postgres_connection_string
Setup Database

Run the SQL file:

psql -U postgres -d your_database -f database.sql
Start Backend Server
node index.js
3️⃣ Setup Frontend
cd client
npm install
npm run dev
🔑 Authentication Flow
User signs up → data stored in PostgreSQL
User logs in → backend verifies credentials
User ID is stored in localStorage
On revisit:
If user ID exists → auto-login
No need to login again unless manually logged out
📌 How It Works
User signs up or logs in
Backend validates user
User ID is saved in localStorage
User can:
➕ Add todos
📋 View all their todos
✏️ Update todos
❌ Delete todos
Todos are fetched based on user ID, ensuring privacy
🔒 Security Note

Currently:

User session is managed using localStorage

Recommended improvements:

Use JWT with HTTP-only cookies
Add password hashing (bcrypt)
Implement route protection middleware
📈 Future Improvements
✅ JWT Authentication
📱 Responsive UI
🔍 Search & Filter Todos
🌙 Dark Mode
📊 Dashboard (task stats)
