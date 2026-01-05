# TOKYO Store 🛒

A modern, full-stack e-commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**.

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT and HTTP-Only cookies.
- **Product Catalog**: Browse products with advanced UI/UX and animations.
- **Shopping Cart**: Real-time cart management.
- **Checkout Process**: Seamless checkout flow with mock payment integration.
- **Order History**: Users can view their past orders.
- **Admin Management**: Seed scripts to manage products and users.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Security**: Implements partial common security practices (Helmet, Rate Limiting, Sanitization).

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** (v4)
- **Framer Motion** (Animations)
- **Axios** (API Requests)
- **Lucide React** (Icons)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** (Mongoose) - Supports Local & Atlas Cloud
- **JWT** (JSON Web Tokens)
- **Bcrypt.js** (Password Hashing)

## 📸 Screenshots

<!-- Add your screenshots in the 'screenshots' folder and uncomment these lines -->
<!-- ![Home Page](./screenshots/home.png) -->
<!-- ![Cart Page](./screenshots/cart.png) -->

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sudanesestore.git
cd sudanesestore
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (or rename `.env.example`):
```env
PORT=5000
URI_DB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5181
```

Run the Data Seeder (Optional - populates database with sample products):
```bash
npm run data:import
```

Start the Backend Server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the Frontend Server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5181` (or the port shown in your terminal).

## 🔑 Default Credentials

To test the application, you can use the pre-seeded admin account:

- **Email**: `admin@example.com`
- **Password**: `password123`

## 🛡️ Security
This project includes standard security configurations:
- **Helmet**: Sets various HTTP headers.
- **Rate Limit**: Limits repeated requests.
- **XSS Clean**: Sanitizes user input.
- **HPP**: Protects against HTTP Parameter Pollution.
- **Mongo Sanitize**: Prevents NoSQL injection.

## 📄 License
MIT
