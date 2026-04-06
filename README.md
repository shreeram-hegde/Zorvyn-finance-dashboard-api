# Finance Dashboard API

This repository contains the backend API for a finance dashboard. It provides user authentication, role-based access control (RBAC), financial record management, and data aggregation for dashboard analytics.

## Architecture & Stack

The application follows a standard layered architecture (Controller-Service-Route) to ensure a clean separation between HTTP handling, business logic, and database operations.

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite (`better-sqlite3`)
* **Validation:** Zod
* **Security:** JWT and Bcrypt

## Local Setup

### Prerequisites
* Node.js (v18+)

### Installation
1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   JWT_SECRET=development_secret_key_change_in_production
   JWT_EXPIRES_IN=1d
   ```

### Running the Server
Start the application in development mode:
```bash
npm run dev
```
The SQLite database (`finance.db`) and necessary tables will automatically initialize on the first run.

## Automated Testing

An integration test script is included to verify the API lifecycle, covering registration, authentication, CRUD operations, filtering, and data aggregation.

With the server running, open a second terminal and execute:
```bash
node test.js
```

## Role-Based Access Control

Access is restricted via middleware based on the user's assigned role:

| Role | Permissions |
| :--- | :--- |
| **Viewer** | Read-only access to dashboard summaries. |
| **Analyst** | Read-only access to dashboard summaries and detailed financial records. |
| **Admin** | Full system access. Can create, update, delete records, and view all data. |

## API Endpoints

### Authentication
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate and retrieve a JWT

### Financial Records (Requires Auth)
* `POST /api/records` - Create a record (Admin)
* `GET /api/records` - Fetch records. Supports `type`, `category`, `startDate`, and `endDate` query parameters. (Admin, Analyst)
* `PUT /api/records/:id` - Update a record (Admin)
* `DELETE /api/records/:id` - Delete a record (Admin)

### Dashboard (Requires Auth)
* `GET /api/dashboard/summary` - Fetch aggregated totals and category breakdowns. (All Roles)

## Technical Assumptions

* **Database:** SQLite was selected to eliminate external database dependencies for the reviewer, ensuring the project runs immediately after installation.
* **Deletion Strategy:** Hard deletes were implemented for simplicity. In a production environment, this would be converted to soft deletes (`deleted_at` timestamp) for auditing purposes.
* **Aggregation:** Dashboard summaries are aggregated at the database level using SQL rather than processing in-memory, ensuring performance remains stable as record volume grows.