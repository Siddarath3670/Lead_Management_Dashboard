# Lead Management Dashboard

A full-stack (MERN) CRM-style dashboard for managing leads.

## Features
- **Authentication**: JWT-based login.
- **Leads Management**: Create, Read, Update, Delete (CRUD) leads.
- **Search & Filter**: Server-side search, filtering by status, and sorting.
- **Pagination**: Efficiently handle large datasets.
- **Analytics**: Dashboard with key metrics (Total Leads, Conversion Rate, etc.).
- **Responsive UI**: Built with React, Tailwind CSS, and Shadcn-like components.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB Atlas

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lead-management-dashboard
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root:
   ```env
### Backend (.env)
MONGO_URI=
JWT_SECRET=
CLERK_SECRET_KEY=

### Frontend (.env)
VITE_API_BASE_URL=
   ```
4. Seed the database (optional but recommended):
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation
- `POST /api/auth/login`: Login user.
- `GET /api/leads`: Fetch leads (supports `page`, `limit`, `search`, `status`, `sort`).
- `GET /api/leads/:id`: Get lead details.
- `GET /api/dashboard`: Get analytics.
