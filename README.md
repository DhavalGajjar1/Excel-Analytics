# 📊 Excel Analytics Dashboard

A full-stack web application where users can register/login, upload Excel files, visualize data with charts (bar, pie, line), export charts as PDF/PNG, and view insights like average, highest/lowest values, and unique categories. Admins can manage users and view total uploaded files.

---

## 🔧 Technologies Used

- **Frontend:** React.js, Tailwind CSS, Chart.js, html2canvas, jsPDF
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, Role-based access (admin/user)
- **File Upload:** Multer
- **Excel Parsing:** XLSX
- **Email OTP:** Nodemailer (for password reset)

---

## ✨ Features

### 🧑‍💼 Authentication
- User & Admin registration/login
- Forgot password with email OTP and password reset
- Only one admin allowed by default

### 👨‍🎓 User Dashboard
- Upload `.xlsx` or `.xls` files
- Select chart type (bar, pie, line)
- Select X/Y columns for visualization
- Export chart as PDF/PNG (A4 format)
- Summary section: average, max/min, unique categories
- View uploaded files with date

### 🛠️ Admin Dashboard
- View all registered users
- Promote users to admin
- View total user count and total uploaded file count
- Filter/search users by name/email/date

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/excel-analytics-dashboard.git
cd excel-analytics-dashboard

##Backend Setup
cd backend
npm install

Create a .env file in backend/
PORT=8080
JWT_SECRET=yourSecretKey
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password

3️⃣ Frontend Setup
cd frontend
npm install
npm start

📁 Folder Structure
backend/
  controllers/
  models/
  routes/
  middleware/
  uploads/
  utils/
  .env
  Server.js

frontend/
  pages/
  components/
  App.jsx
