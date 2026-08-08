# 🌴 Myladoor Holidays

> A full-stack travel and vehicle booking platform built with **Next.js, NestJS, Prisma, and PostgreSQL**, designed to manage holiday packages, vehicle fleets, customer inquiries, bookings, and role-based user workflows.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com/)

**Live Application:** https://myladoor-holidays.vercel.app/

---

## 📌 Overview

**Myladoor Holidays** is a full-stack web platform developed for a travel and tourism business in **Thrissur, Kerala**.

The system combines a modern customer-facing website with a backend API for managing vehicles, bookings, users, and travel inquiries.

Customers can explore available vehicles and travel services, submit inquiries, and create bookings, while administrators can manage operational data through backend APIs.

---

## ✨ Features

### 👤 Customer

* User registration and login
* Browse travel services
* Explore vehicle fleet
* View vehicle capacity, pricing and features
* Submit travel inquiries
* Create vehicle bookings
* Select trip type and travel dates
* Specify pickup and destination
* Add passenger count and notes
* View personal bookings

### 🔐 Authentication

* JWT-based authentication
* Password hashing with bcrypt
* User and administrator roles
* Protected authentication flow
* User profile information

### 🚐 Fleet Management

* Vehicle listing
* Vehicle details
* Vehicle categories
* Seating capacity
* Daily pricing
* Availability status
* Vehicle images
* Feature management
* Create, update and delete vehicles

### 📅 Booking Management

```text
Customer
   ↓
Select Vehicle
   ↓
Trip Details
   ↓
Pickup / Destination
   ↓
Travel Dates
   ↓
Passenger Count
   ↓
Create Booking
   ↓
PENDING
   ↓
CONFIRMED / CANCELLED / COMPLETED
```

### 📩 Inquiry Management

* Customer inquiry submission
* Inquiry listing
* Mark inquiry as read
* Timestamped inquiries
* Admin-side inquiry management

---

## 🏗️ System Architecture

The application follows a **full-stack monorepo architecture**:

```text
                    ┌──────────────────────┐
                    │       Customer       │
                    │      Web Browser     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Next.js         │
                    │   React Frontend     │
                    └──────────┬───────────┘
                               │
                         REST / JSON
                               │
                               ▼
                    ┌──────────────────────┐
                    │       NestJS         │
                    │      REST API        │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
          ┌──────────────┐          ┌──────────────┐
          │    Prisma    │          │     JWT      │
          │     ORM      │          │ Authentication│
          └──────┬───────┘          └──────────────┘
                 │
                 ▼
          ┌──────────────┐
          │  PostgreSQL  │
          │   Database   │
          └──────────────┘
```

---

## 🧩 Application Modules

```text
Myladoor Holidays
│
├── Authentication
│   ├── Registration
│   └── Login / JWT
│
├── Users
│   └── User Management
│
├── Vehicles
│   ├── Fleet Listing
│   ├── Vehicle Details
│   └── CRUD Operations
│
├── Bookings
│   ├── Create Booking
│   ├── User Bookings
│   └── Status Management
│
└── Inquiries
    ├── Submit Inquiry
    ├── View Inquiries
    └── Mark as Read
```

---

## 🗄️ Database Design

The application uses **Prisma ORM with PostgreSQL**.

```text
┌──────────────┐
│     User     │
├──────────────┤
│ id           │
│ email        │
│ password     │
│ name         │
│ phone        │
│ role         │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│   Booking    │
├──────────────┤
│ vehicleId    │
│ tripType     │
│ from         │
│ to           │
│ pickupDate   │
│ returnDate   │
│ pax          │
│ status       │
│ notes        │
└──────┬───────┘
       │
       │ N:1
       ▼
┌──────────────┐
│   Vehicle    │
├──────────────┤
│ name         │
│ category     │
│ capacity     │
│ pricePerDay  │
│ status       │
│ image        │
│ features     │
└──────────────┘

┌──────────────┐
│   Inquiry    │
├──────────────┤
│ name         │
│ phone        │
│ message      │
│ read         │
│ createdAt    │
└──────────────┘
```

---

## 🛠️ Tech Stack

| Layer                 | Technology                 |
| --------------------- | -------------------------- |
| **Frontend**          | Next.js, React, TypeScript |
| **Styling**           | Tailwind CSS / PostCSS     |
| **Backend**           | NestJS                     |
| **Language**          | TypeScript                 |
| **ORM**               | Prisma                     |
| **Database**          | PostgreSQL                 |
| **Authentication**    | JWT                        |
| **Password Security** | bcryptjs                   |
| **Testing**           | Jest, Supertest            |
| **Code Quality**      | ESLint, Prettier           |
| **Deployment**        | Vercel                     |

---

## 📁 Project Structure

```text
Myladoor_Holidays/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── inquiry/
│   │   ├── user/
│   │   ├── vehicle/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── test/
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── images/
│   ├── app/
│   ├── components/
│   ├── next.config.mjs
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Vehicles

```http
GET    /vehicles
GET    /vehicles/:id
POST   /vehicles
PATCH  /vehicles/:id
DELETE /vehicles/:id
```

### Bookings

```http
POST  /bookings
GET   /bookings
GET   /bookings/user/:userId
PATCH /bookings/:id/status
```

### Inquiries

```http
POST  /inquiries
GET   /inquiries
PATCH /inquiries/:id/read
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js 20+
* npm
* PostgreSQL
* Git

### 1. Clone

```bash
git clone https://github.com/AlinAlexMyladoor/Myladoor_Holidays.git
cd Myladoor_Holidays
```

### 2. Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/myladoor"
DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/myladoor"
JWT_SECRET="your_secure_secret"
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
npm run seed
```

Start backend:

```bash
npm run start:dev
```

### 3. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Testing

Backend unit and end-to-end tests are configured with Jest.

```bash
cd backend

npm test
npm run test:cov
npm run test:e2e
```

---

## 💡 Engineering Concepts

* Full-stack TypeScript development
* Next.js application architecture
* NestJS modular architecture
* REST API design
* Prisma ORM
* PostgreSQL relational modeling
* JWT authentication
* bcrypt password hashing
* Role-based workflows
* CRUD operations
* Booking lifecycle management
* Database migrations
* API validation
* Unit and E2E testing
* Environment-based configuration
* Production deployment with Vercel

---

## 🚀 Future Improvements

* Protect all booking and admin endpoints with JWT guards
* Add DTO validation with `class-validator`
* Implement vehicle availability conflict detection
* Add payment gateway integration
* Add booking cancellation/refund workflow
* Add email/SMS notifications
* Add admin dashboard analytics
* Add Docker deployment
* Add CI/CD pipeline
* Add comprehensive integration testing

---

## 👨‍💻 Author

### Alin Alex

Computer Science & Engineering Student
Christ College of Engineering, Kerala, India

**GitHub:**
https://github.com/AlinAlexMyladoor

**Live Project:**
https://myladoor-holidays.vercel.app/

**Repository:**
https://github.com/AlinAlexMyladoor/Myladoor_Holidays

---

⭐ If you find this project useful, consider giving the repository a star.
