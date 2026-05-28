# TechStore - Full-Stack Ecommerce Platform

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)

TechStore is a production-style MERN ecommerce application for consumer electronics. It includes a React storefront, JWT authentication, cart and checkout flows, stock-aware order creation, wishlist and reviews, PDF invoice generation, and an admin dashboard with order analytics.

## Live Demo

- Frontend: `https://tech-store-ashen-three.vercel.app`
- Backend API: `https://techstore-kjo7.onrender.com`
- Health Check: `https://techstore-kjo7.onrender.com/api/health`

## Why This Project Stands Out

- Built a full-stack shopping workflow from product discovery to checkout, order history, status tracking, and invoice download.
- Implemented secure backend foundations with JWT auth, role-based admin routes, Helmet, CORS allowlisting, rate limiting, and MongoDB query sanitization.
- Designed admin analytics using aggregation pipelines and Recharts for revenue, order status, recent orders, and sales trends.
- Added realistic ecommerce details such as stock validation, tracking numbers, order status timelines, mock payments, persisted cart state, wishlists, and product reviews.
- Configured deployment-ready frontend/backend separation with Vercel rewrites and Render-compatible environment configuration.

## Features

### Customer Experience

- Browse products by category, sale, shop, explore, and product detail pages.
- Search and filter products by keyword, category, price range, rating, sorting, and pagination.
- Register and login with JWT-backed authentication.
- Add products to cart with persisted local storage state.
- Save shipping details during checkout.
- Place mock-payment orders with automatic stock deduction.
- View order history, order details, payment status, tracking number, and status timeline.
- Download PDF invoices for paid orders.
- Add, remove, and check wishlist items.
- Create, update, and delete product reviews.

### Admin Experience

- Role-protected admin panel.
- Dashboard cards for total orders, users, products, and revenue.
- Sales trend and order-status charts.
- Recent orders table.
- User management with pagination and deletion.
- Order management with status filtering and status updates.
- Backend product management APIs for listing, updating, and deleting products.

### Backend Capabilities

- REST API built with Express and MongoDB.
- JWT authentication middleware with admin authorization.
- Mongoose models for users, products, orders, reviews, and wishlists.
- Product filtering, sorting, searching, and pagination.
- Stock validation before order creation.
- Order analytics with MongoDB aggregation.
- PDF invoice generation using PDFKit.
- Seed script for demo users and product data.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router, Redux Toolkit, React Redux |
| Styling | Tailwind CSS, custom CSS, Lucide React icons |
| Data Fetching | Axios with JWT request interceptor |
| Charts | Recharts |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Auth | JSON Web Tokens, bcryptjs |
| Security | Helmet, CORS, express-rate-limit, express-mongo-sanitize |
| Documents | PDFKit |
| Deployment | Vercel frontend, Render backend |

## Project Structure

```text
Ecommerce/
|-- backend/
|   |-- config/             # MongoDB connection
|   |-- controllers/        # Business logic for API resources
|   |-- data/               # Seed users and products
|   |-- middleware/         # JWT and admin authorization
|   |-- models/             # Mongoose schemas
|   |-- routes/             # Express route definitions
|   |-- scripts/            # Utility scripts
|   |-- seeder.js           # Import/destroy seed data
|   `-- server.js           # Express app entry point
|-- frontend/
|   |-- public/             # Static assets and redirects
|   |-- src/
|   |   |-- components/     # Shared UI components
|   |   |-- pages/          # Storefront, auth, checkout, admin pages
|   |   |-- services/       # Axios API client
|   |   |-- slices/         # Redux Toolkit slices
|   |   |-- utils/          # Toast helpers
|   |   `-- store.js        # Redux store
|   `-- vercel.json         # Vercel rewrite configuration
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js `20+`
- npm
- MongoDB Atlas cluster or local MongoDB instance

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Ecommerce
```

### 2. Configure the Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Update `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
RATE_LIMIT_MAX=1000
```

Seed demo data:

```powershell
npm run seed
```

Start the API:

```powershell
npm run dev
```

The API will run at `http://localhost:5000`.

### 3. Configure the Frontend

Open a second terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
```

Update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite dev server:

```powershell
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Demo Accounts

After running `npm run seed`, you can use:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@techstore.in` | `123456` |
| Customer | `rahul@example.com` | `123456` |
| Customer | `priya@example.com` | `123456` |

## Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Start API with Node watch mode |
| `npm start` | Start API in standard Node mode |
| `npm run seed` | Import demo users and products |
| `npm run seed:destroy` | Remove seeded users, products, and orders |
| `npm run seed:images` | Update product images |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## API Overview

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/users` | Public | Register a new user |
| `POST` | `/api/users/login` | Public | Login and receive JWT |
| `GET` | `/api/products` | Public | Get products with filters and pagination |
| `GET` | `/api/products/:id` | Public | Get product details |
| `POST` | `/api/products/:id/reviews` | Private | Create product review |
| `GET` | `/api/search/search` | Public | Search products |
| `GET` | `/api/search/category/:category` | Public | Get products by category |
| `GET` | `/api/search/filters` | Public | Get category, brand, and price filters |
| `GET` | `/api/wishlist` | Private | Get wishlist |
| `POST` | `/api/wishlist/:productId` | Private | Add product to wishlist |
| `DELETE` | `/api/wishlist/:productId` | Private | Remove product from wishlist |
| `POST` | `/api/orders` | Private | Create order |
| `GET` | `/api/orders` | Private | Get current user's orders |
| `GET` | `/api/orders/:id` | Private | Get order details |
| `GET` | `/api/orders/analytics/summary` | Private | Get user order summary |
| `GET` | `/api/invoices/:orderId` | Private | Download invoice PDF |
| `GET` | `/api/admin/stats` | Admin | Get dashboard stats |
| `GET` | `/api/admin/analytics` | Admin | Get sales analytics |
| `GET` | `/api/admin/users` | Admin | List users |
| `GET` | `/api/admin/orders` | Admin | List orders |
| `PUT` | `/api/admin/orders/:id` | Admin | Update order status |
| `GET` | `/api/admin/products` | Admin | List products |
| `PUT` | `/api/admin/products/:id` | Admin | Update product |
| `DELETE` | `/api/admin/products/:id` | Admin | Delete product |

## Security Notes

- Passwords are hashed using `bcryptjs`.
- JWT tokens protect customer and admin-only routes.
- Admin APIs require both a valid token and `isAdmin` authorization.
- Helmet sets secure HTTP headers.
- CORS is restricted through `CLIENT_URL`.
- API rate limiting is enabled under `/api`.
- MongoDB query sanitization helps reduce NoSQL injection risk.

## Deployment Notes

The frontend is configured for Vercel. `frontend/vercel.json` rewrites `/api/*` requests to the Render backend and routes all other paths to `index.html` for client-side routing.

For production, configure:

- Backend environment variables in Render.
- Frontend `VITE_API_URL=/api` when using the Vercel rewrite.
- `CLIENT_URL` on the backend with the final Vercel domain.

## Resume Summary

Built a full-stack MERN ecommerce platform with React, Redux Toolkit, Express, MongoDB, JWT authentication, role-based admin controls, order analytics, stock-aware checkout, PDF invoice generation, and production deployment configuration for Vercel and Render.

## Future Improvements

- Complete frontend product management UI for admins.
- Add real payment gateway integration such as Stripe or Razorpay.
- Add automated backend and frontend tests.
- Add image upload support for product management.
- Add email notifications for order confirmations and delivery updates.
