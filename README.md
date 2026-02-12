# 🚀 Productify

Productify is a full-stack PERN (PostgreSQL, Express, React, Node.js) product management application built with modern best practices, secure APIs, and a production-ready deployment architecture.

It enables users to create, manage, and update products with images and pricing through a clean, fast, and responsive user interface.

---

## 🌐 Live Demo
  
https://productify-sewc.onrender.com

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (Vite)
- Tailwind CSS
- Zustand (State Management)
- React Router DOM
- Axios

### 🔹 Backend
- Node.js
- Express 5
- PostgreSQL (Neon Serverless)
- Express Rate Limit
- Helmet (Security Middleware)
- Morgan (HTTP Logging)
- CORS

### 🔹 Dev & Deployment
- Environment-based configuration
- Static frontend serving in production
- Cloud deployment compatible (Vercel / Render / Railway)

---

## ✨ Core Features

- 📦 Full CRUD operations for products
- 🖼️ External product image support (URL-based)
- 🛡️ Secure REST API with Helmet & CSP
- 🚦 API Rate Limiting for abuse prevention
- 🧾 Request logging with Morgan
- 🌍 Cross-Origin Resource Sharing (CORS) enabled
- ⚡ High-performance frontend with Vite
- 🎨 Modern UI built with Tailwind CSS
- 🗄️ PostgreSQL database with auto table initialization
- 🚀 Production-ready Express static serving

---

## 📂 Project Structure

```
productify/
│
├── backend/
│   ├── config/
│   │   └── db.js                # Database connection (Neon / PostgreSQL)
│   │
│   ├── controllers/
│   │   └── productController.js # Product business logic (CRUD)
│   │
│   ├── middleware/
│   │   └── rateLimiter.js       # API rate limiting middleware
│   │
│   ├── routes/
│   │   └── productRoutes.js     # Product API routes
│   │
│   ├── seeds/
│   │   └── products.js          # Sample product seed script
│   │
│   ├── products.rest            # REST client testing file
│   ├── note.txt                 # Development notes
│   └── server.js                # Express app entry point
│
├── frontend/
│   ├── public/                  # Static assets
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page-level components
│   │   ├── constants/           # App constants
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── store/
│   │   ├── useProductStore.js   # Product state management (Zustand)
│   │   └── useThemeStore.js     # Theme state management
│   │
│   ├── dist/                    # Production build output
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── package.json                 # Root configuration & scripts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
DATABASE_URL=your_neon_database_url
NODE_ENV=development
```

For production:

```
NODE_ENV=production
```

---

## 🧪 Local Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/productify.git
cd productify
```

### 2️⃣ Install Dependencies

```bash
npm install
npm install --prefix frontend
```

### 3️⃣ Run in Development Mode

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 🏗️ Production Build

```bash
npm run build
NODE_ENV=production npm start
```

This will:

- Build the React frontend
- Serve static files from `/frontend/dist`
- Enable production optimizations
- Activate secure headers & middleware

---

## 🔐 Security Implementation

- Helmet for secure HTTP headers
- Custom Content Security Policy (CSP)
- API rate limiting on `/api` routes
- CORS protection
- Environment variable isolation
- Express 5 secure routing setup

---

## 🗄️ Database Schema

### Products Table

```sql
id SERIAL PRIMARY KEY
name VARCHAR(255) NOT NULL
image VARCHAR(255) NOT NULL
price DECIMAL(10,2) NOT NULL
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

The database automatically initializes the table if it does not exist.

---

## 🚀 Deployment Options

This project is compatible with:

- Vercel
- Render
- Railway
- DigitalOcean
- Any Node.js cloud provider

---

## 📈 Future Enhancements

- JWT Authentication
- Role-based access control (Admin/User)
- Image upload via Cloudinary / AWS S3
- Pagination & filtering
- Product categories
- Dark mode toggle
- Docker support
- CI/CD integration

---

## 👨‍💻 Author

**Amit Kumar**

If you found this project helpful, consider giving it a ⭐ on GitHub.
