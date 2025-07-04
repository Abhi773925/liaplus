# Blog Application

A full-stack blog application with React.js frontend and Node.js backend, featuring user authentication and role-based access control.

## 🚀 Features

- **User Authentication**: Secure login/signup
- **Role-Based Access**: Admin and user permissions
- **Blog Management**: Full CRUD operations for posts
- **Responsive Design**: Mobile-friendly with Tailwind CSS
- **Image Support**: URL-based image integration

## 🛠️ Tech Stack

**Frontend**: React.js, React Router, Axios, Tailwind CSS  
**Backend**: Node.js, Express.js, MongoDB, bcrypt, JWT

## 📋 Quick Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/Abhi773925/liaplus
cd blog-application
```

2. **Backend Setup**
```bash
cd backend
npm install express mongoose bcrypt jsonwebtoken cors dotenv
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your-secret-key
```

3. **Frontend Setup**
```bash
cd frontend
npm install react react-dom react-router-dom axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Run Application**
```bash
# Backend (terminal 1)
cd backend && node index.js

# Frontend (terminal 2)
cd frontend && npm run dev
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/createuser` - Register user
- `POST /api/users/loginuser` - Login user
- `GET /api/users/checkuserrole` - Check user role

### Blog Operations
- `GET /api/users/getblog` - Get all blogs
- `GET /api/users/get?id=blogId` - Get blog by ID
- `POST /api/users/createblog` - Create blog (Admin only)
- `PUT /api/users/updateblog` - Update blog (Admin only)
- `DELETE /api/users/deleteblog` - Delete blog (Admin only)

## 📱 Project Structure

```
blog-application/
├── backend/
│   ├── models/        # User & Blog schemas
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   └── server.js      # Express server
├── frontend/
│   └── src/
│       ├── components/    # React components
│       ├── App.js
│       └── index.js
```

## 🔐 User Roles

**Admin**: Create, edit, delete any blog post  
**User**: View all blog posts only

## 🛡️ Security Features

- Password hashing with bcrypt
- Role-based access control
- Input validation
- Error handling

## 🚀 Deployment

### Production Environment Variables
```env
NODE_ENV=production
MONGODB_URI=your-production-uri
JWT_SECRET=strong-secret-key
PORT=5000
```

### Hosting Options
- **Backend**: Heroku, Railway, DigitalOcean
- **Frontend**: Netlify, Vercel
- **Database**: MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

MIT License

---

**Note**: Ensure backend server is running before starting frontend application.