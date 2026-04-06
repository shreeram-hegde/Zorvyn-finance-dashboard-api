# Finance Dashboard API

Backend API for a finance dashboard featuring JWT authentication, role-based access control (RBAC), record management, and SQL-aggregated analytics.

## Stack & Architecture

Uses a Layered Architecture (Controller-Service-Route) to strictly separate HTTP handling from business logic.

* **Framework:** Node.js / Express.js
* **Database:** SQLite (`better-sqlite3`)
* **Validation & Security:** Zod, JWT, Bcrypt

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   JWT_SECRET=development_secret_key
   JWT_EXPIRES_IN=1d
   ```
3. Start the server (the SQLite database auto-initializes):
   ```bash
   npm run dev
   ```

## Manual Tests

A Postman Collection (postman_collection.json):
this can be used along with below api information to perform tests

## Access Control

| Role | Permissions |
| :--- | :--- |
| **Viewer** | Read-only access to dashboard summaries. |
| **Analyst** | Read-only access to summaries and detailed records. |
| **Admin** | Full CRUD access to all records and summaries. |

## API Endpoints

**Auth**
* `POST /api/auth/register` 
* `POST /api/auth/login` 

**Records (Requires Auth)**
* `POST /api/records` - (Admin)
* `GET /api/records` - Filters: `type`, `category`, `startDate`, `endDate` (Admin, Analyst)
* `PUT /api/records/:id` - (Admin)
* `DELETE /api/records/:id` - (Admin)

**Dashboard (Requires Auth)**
* `GET /api/dashboard/summary` - Aggregated totals & breakdowns (All Roles)

## Technical Assumptions

* **Database:** SQLite was used to eliminate external dependencies, ensuring the project runs instantly for reviewers.
* **Deletion:** Hard deletes were used for the MVP. A production environment would use soft deletes for auditing.
* **Aggregation:** Dashboard summaries are aggregated natively at the SQL level (e.g., `SUM`, `GROUP BY`) rather than processing arrays in memory to ensure high performance.