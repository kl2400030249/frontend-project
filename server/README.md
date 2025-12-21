# Workshop Server

This is a minimal Express + Mongoose backend for the Workshop frontend app.

Setup:
1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. npm install
3. npm run dev (requires nodemon) or npm start

Endpoints:
- POST /api/auth/signup -> { name, email, password }
- POST /api/auth/login -> { email, password }
- GET /api/workshops -> list of workshops
- POST /api/workshops -> create workshop (requires Authorization: Bearer <token>)

Note: This is a demo server intended for local testing. Do not use in production without improvements (rate limiting, input validation, production database config, etc.).