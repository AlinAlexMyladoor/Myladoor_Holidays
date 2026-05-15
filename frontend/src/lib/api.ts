// In development: calls NestJS directly on localhost:3000
// In production on Vercel: calls /api/* which rewrites to myladoor-holidays.onrender.com/*
// This means the user only needs ONE URL: myladoor-holidays.vercel.app
export const API_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : '/api';
