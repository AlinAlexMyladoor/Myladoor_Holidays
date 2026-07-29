# Myladoor Holidays

Welcome to the repository for **Myladoor Holidays**! This project is a comprehensive, full-stack web application designed to serve as the digital platform for our travel, tourism, and vehicle booking business based in Thrissur, Kerala.

## 🚀 Overview

The Myladoor Holidays platform streamlines the process of booking holiday packages and renting vehicles. It provides a seamless user experience for customers to browse offerings, submit inquiries, and manage bookings, alongside a robust backend to handle business logic, user authentication, and data management.

## ✨ Features

- **User Authentication:** Secure login and registration for customers and administrators.
- **Vehicle & Fleet Management:** View and manage available vehicles (e.g., Innova Crysta, Coaches, Force Traveller, Sedans) for transfers and services.
- **Holiday Packages:** Browse destinations (like Alleppey) and custom travel itineraries.
- **Booking & Inquiry System:** Dedicated modules for customers to submit travel inquiries and manage active bookings.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

This project is structured as a monorepo containing both the frontend client and the backend API.

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Language:** TypeScript
- **Styling:** PostCSS (Tailwind CSS)
- **Package Manager:** npm

### Backend
- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** Relational Database (configured via Prisma, e.g., PostgreSQL/MySQL)
- **Testing:** Jest (e2e and unit tests)
- **Code Formatting/Linting:** ESLint & Prettier

## 📁 Project Structure

```text
Myladoor_Holidays/
├── backend/                  # NestJS API
│   ├── prisma/               # Database schema and seed scripts
│   ├── src/                  # Core application logic
│   │   ├── auth/             # Authentication module
│   │   ├── booking/          # Booking management module
│   │   ├── inquiry/          # Customer inquiry module
│   │   ├── user/             # User management module
│   │   └── vehicle/          # Vehicle/Fleet management module
│   ├── test/                 # e2e Testing (Jest)
│   └── package.json          
│
└── frontend/                 # Next.js Client Application
    ├── public/               # Static assets (images, favicons)
    │   └── images/           # Fleet and destination imagery
    ├── next.config.mjs       # Next.js configuration
    ├── postcss.config.js     # CSS processing config
    └── package.json
