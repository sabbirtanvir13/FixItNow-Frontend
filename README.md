# 🔧 FixItNow Frontend

> **Your Trusted Home Service Platform**

A modern, responsive, and role-based home service marketplace built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. Customers can discover trusted professionals, book home services, and securely pay online, while technicians manage their services and admins oversee the platform.

---

## 🌐 Live Demo

* **Frontend:** https://your-frontend-url.vercel.app
* **Backend API:** https://your-backend-api.vercel.app
* **Backend Repository:** https://github.com/your-username/fixitnow-backend

---

## 📸 Preview

> Add screenshots or GIFs of your homepage, dashboards, and booking flow here.

---

# ✨ Features

## 👥 Multi-Role Authentication

* Customer Registration & Login
* Technician Registration & Login
* Admin Dashboard Access
* JWT Authentication
* Role-Based Route Protection
* Next.js Middleware

---

## 🏠 Public Features

* Modern Responsive Homepage
* Featured Services
* Popular Categories
* Top Rated Technicians
* Service Search & Filtering
* Technician Profile Page
* Loading Skeletons
* Error Boundaries

---

## 👤 Customer Features

* Browse Services
* View Technician Profiles
* Book Home Services
* Select Available Time Slots
* Booking History
* Payment History
* Secure Payment Integration
* Cancel Eligible Bookings
* Submit Reviews

---

## 🛠 Technician Features

* Technician Dashboard
* Manage Profile
* Update Services
* Availability Scheduler
* Incoming Booking Requests
* Accept / Decline Requests
* Start Jobs
* Complete Jobs
* Earnings Overview

---

## 👨‍💼 Admin Features

* Platform Overview Dashboard
* User Management
* Ban / Unban Users
* Category Management
* Booking Monitoring
* Platform Statistics

---

# 🚀 Tech Stack

### Framework

* Next.js (App Router)
* React
* TypeScript

### Styling

* Tailwind CSS
* shadcn/ui
* Lucide React
* Framer Motion

### State Management

* TanStack Query (React Query)
* React Hook Form

### Validation

* Zod

### API

* Axios

### Authentication

* JWT
* Next.js Middleware

### Notifications

* Sonner

---

# 📂 Folder Structure

```text
app/
│
├── (public)/
│   ├── page.tsx
│   ├── services/
│   ├── technicians/
│   └── about/
│
├── auth/
│   ├── login/
│   └── register/
│
├── dashboard/
│   ├── customer/
│   ├── technician/
│   └── admin/
│
├── payment/
│   ├── success/
│   └── cancel/
│
├── loading.tsx
├── error.tsx
└── layout.tsx

components/
hooks/
lib/
providers/
services/
types/
utils/
middleware.ts
```

---

# 📄 Pages

## Public

* Home
* Services
* Technician Details
* About
* Contact
* Login
* Register

---

## Customer

* Dashboard
* Booking History
* Payment History
* Reviews

---

## Technician

* Dashboard
* Profile
* Services
* Availability
* Booking Management

---

## Admin

* Dashboard
* Users
* Categories
* Bookings

---

# 🔄 Booking Flow

```text
Register/Login
        │
        ▼
Browse Services
        │
        ▼
Choose Technician
        │
        ▼
Select Date & Time
        │
        ▼
Submit Booking
        │
        ▼
Technician Accepts
        │
        ▼
Online Payment
        │
        ▼
Service Starts
        │
        ▼
Completed
        │
        ▼
Leave Review
```

---

# 📊 Booking Status

| Status      | Description            |
| ----------- | ---------------------- |
| REQUESTED   | Booking submitted      |
| ACCEPTED    | Accepted by technician |
| DECLINED    | Booking rejected       |
| PAID        | Payment completed      |
| IN_PROGRESS | Technician is working  |
| COMPLETED   | Service completed      |
| CANCELLED   | Booking cancelled      |

---

# 🔒 Route Protection

### Public

* Home
* Services
* Technician Details
* Login
* Register

### Customer

* Customer Dashboard
* Bookings
* Payments

### Technician

* Technician Dashboard
* Availability
* Booking Management

### Admin

* Admin Dashboard
* User Management
* Categories

---

# 📱 Responsive Design

* Mobile First
* Tablet Optimized
* Desktop Optimized
* Cross Browser Compatible

---

# ⚡ Performance

* Next.js App Router
* Optimized Images
* Lazy Loading
* Code Splitting
* Loading Skeletons
* Error Boundaries

---

# 🛠 Installation

```bash
git clone https://github.com/your-username/fixitnow-frontend.git

cd fixitnow-frontend

npm install

npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
```

---

# 📦 Build

```bash
npm run build
```

---

# 🚀 Deployment

This project can be deployed on:

* Vercel
* Netlify

---

# 🎯 Future Improvements

* Real-Time Notifications
* Live Chat
* Google Maps Integration
* Push Notifications
* Dark Mode
* AI-Based Technician Recommendation
* Multi-Language Support
* Advanced Analytics
* PWA Support

---

# 👨‍💻 Developer

**Sabbir**

Frontend Developer

* GitHub: https://github.com/your-username
* LinkedIn: https://linkedin.com/in/your-profile

---

# 📄 License

This project is developed for educational purposes as part of a frontend assignment.

---

⭐ If you like this project, don't forget to give it a star!
