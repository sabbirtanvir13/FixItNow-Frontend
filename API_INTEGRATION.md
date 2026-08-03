# API Integration Documentation

# FixItNow - Frontend API Integration

## Base URL

```
https://fixitnow-frontend-flax.vercel.app
```

---

# Authentication

| Frontend Page / Component | Method | Endpoint | Description |
|----------------------------|--------|----------|-------------|
| Login Page | POST | `/auth/login` | User login |
| Register Page | POST | `/auth/register` | Create new account |
| Navbar / Layout | GET | `/auth/me` | Get logged in user |
| Logout Action | - | Remove Cookie | Logout user |

---

# Categories

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Home Categories | GET | `/categories` | Get all categories |
| Service Form | GET | `/categories` | Category dropdown |
| Admin Category List | GET | `/categories` | View categories |
| Add Category | POST | `/categories` | Create category |
| Update Category | PATCH | `/categories/:id` | Update category |
| Delete Category | DELETE | `/categories/:id` | Delete category |

---

# Services

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Home Services | GET | `/services` | Latest services |
| Services Page | GET | `/services` | All services |
| Search & Filter | GET | `/services?search=&category=` | Search services |
| Service Details | GET | `/services/:id` | Single service |
| Technician Dashboard | GET | `/services/my-services` | Technician services |
| Add Service Dialog | POST | `/services` | Create service |
| Edit Service | PATCH | `/services/:id` | Update service |
| Delete Service | DELETE | `/services/:id` | Delete service |

---

# Technicians

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Technician Listing | GET | `/technician/profile` | All technicians |
| Featured Technician | GET | `/technician/profile` | Top rated technicians |
| Technician Details | GET | `/technician/profile/:id` | Technician profile |
| Technician Dashboard | GET | `/technician/me` | Logged technician profile |
| Update Technician Profile | PATCH | `/technician/profile` | Update profile |

---

# Bookings

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Book Appointment | POST | `/bookings` | Create booking |
| Customer Dashboard | GET | `/bookings/my-bookings` | Customer bookings |
| Booking Details | GET | `/bookings/:id` | Booking details |
| Cancel Booking | PATCH | `/bookings/:id/cancel` | Cancel booking |
| Technician Dashboard | GET | `/technician/bookings` | Assigned bookings |
| Accept Booking | PATCH | `/bookings/:id/accept` | Accept booking |
| Reject Booking | PATCH | `/bookings/:id/reject` | Reject booking |
| Start Service | PATCH | `/bookings/:id/start` | Service started |
| Complete Service | PATCH | `/bookings/:id/complete` | Service completed |

---

# Reviews

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Review Form | POST | `/reviews` | Submit review |
| Technician Details | GET | `/reviews/technician/:id` | Technician reviews |
| Customer Dashboard | GET | `/reviews/my-reviews` | User reviews |

---

# Payments

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Payment Button | POST | `/payments/create` | Initialize SSLCommerz payment |
| SSL Success Page | GET | `/payments/success/:transactionId` | Payment success |
| SSL Fail Page | GET | `/payments/fail/:transactionId` | Payment failed |
| SSL Cancel Page | GET | `/payments/cancel/:transactionId` | Payment cancelled |
| Payment History | GET | `/payments/history` | Customer payment history |
| Payment Details | GET | `/payments/:id` | Single payment details |

---

# Customer Dashboard

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Dashboard Overview | GET | `/dashboard/customer` | Customer statistics |
| My Bookings | GET | `/bookings/my-bookings` | Booking list |
| Payment History | GET | `/payments/history` | Payment history |
| Profile | GET | `/auth/me` | User profile |

---

# Technician Dashboard

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Dashboard Overview | GET | `/dashboard/technician` | Technician statistics |
| My Services | GET | `/services/my-services` | Service list |
| My Bookings | GET | `/technician/bookings` | Assigned bookings |
| Earnings | GET | `/payments/technician` | Earnings history |
| Profile | GET | `/technician/me` | Technician profile |

---

# Admin Dashboard

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Dashboard Overview | GET | `/dashboard/admin` | Admin statistics |
| Manage Users | GET | `/users` | All users |
| Update User Role | PATCH | `/users/:id/role` | Change role |
| Manage Categories | GET | `/categories` | Category list |
| Manage Services | GET | `/services` | Service list |
| Manage Bookings | GET | `/bookings` | Booking management |
| Manage Payments | GET | `/payments` | Payment management |

---

# Profile

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| My Profile | GET | `/auth/me` | User information |
| Update Profile | PATCH | `/users/profile` | Update profile |

---

# File Uploads

| Frontend Component | Method | Endpoint | Description |
|-------------------|--------|----------|-------------|
| Avatar Upload | POST | `/upload` | Upload profile image |
| Service Image Upload | POST | `/upload` | Upload service image |

---

# API Features Used

- JWT Authentication
- HTTP Only Cookie Authentication
- Protected Routes
- Role Based Authorization
- Search
- Category Filter
- Pagination
- Dynamic Routing
- Booking Workflow
- SSLCommerz Payment Gateway
- Review & Rating System
- Dashboard Statistics
- Profile Management
- CRUD Operations
- Loading & Error Handling
- Server Actions
- Next.js Fetch API
- Cache Revalidation

---

# Authentication Flow

```
Register
    │
    ▼
Login
    │
    ▼
JWT Token (HTTP Only Cookie)
    │
    ▼
/auth/me
    │
    ▼
Protected Routes
```

---

# Booking Flow

```
Browse Services
      │
      ▼
Technician Details
      │
      ▼
Book Appointment
      │
      ▼
Payment (SSLCommerz)
      │
      ▼
Pending Booking
      │
      ▼
Technician Accepts
      │
      ▼
In Progress
      │
      ▼
Completed
      │
      ▼
Review & Rating
```

---

# Payment Flow

```
Create Booking
      │
      ▼
Create Payment
      │
      ▼
SSLCommerz Gateway
      │
      ├────────► Success
      │              │
      │              ▼
      │       Booking Confirmed
      │
      ├────────► Failed
      │
      └────────► Cancelled
```

---

## Technologies Used for API Integration

- Next.js App Router
- Server Actions
- Fetch API
- TypeScript
- HTTP Only Cookies
- Dynamic Routes
- Route Protection
- Revalidation
- Tailwind CSS
- Shadcn UI
