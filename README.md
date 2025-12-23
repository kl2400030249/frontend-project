# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Local backend (optional)

This repo includes a minimal Express + Mongoose backend in the `server/` folder for local testing of signup/login and workshop creation. To run it locally:

1. Copy `server/.env.example` -> `server/.env` and set `MONGO_URI` and `JWT_SECRET`.
2. From the project root install server deps: `cd server && npm install`.
3. Start the server: `npm run dev` (or `npm start`). The default port is `5000`.
4. Set `VITE_API_URL` in the frontend `.env` (see `.env.example`) to `http://localhost:5000` and start the frontend: `npm run dev`.

Endpoints provided:
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/workshops`
- POST `/api/workshops` (requires `Authorization: Bearer <token>`)

Note: This server is a small demo and not production-ready (no rate-limiting, validation middleware, etc.).

## Authentication Design (Hackathon Scope)

- This project uses localStorage to simulate authentication.
- Admin accounts are pre-seeded (demo purpose).
- New signups create student accounts only.
- No backend or real database is used.
- This design choice aligns with a frontend-only framework project.

