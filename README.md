# React E-Commerce Store

A modern, responsive, and highly interactive E-Commerce application built with **React**, **Redux Toolkit**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- **Domain-Driven Architecture**: Clean, scalable folder structure grouping logic by domain (features like `auth`, `products`, `cart`).
- **State Management**: Robust state handling using `@reduxjs/toolkit` and `react-redux`.
- **Advanced UI & Animations**: Premium user interface utilizing `framer-motion` for fluid page transitions, staggered list appearances, floating docks, and interactive micro-animations.
- **Glassmorphism & Theming**: Full support for both **Light** and **Dark mode** with glassmorphic overlays, vibrant gradients, and user preference persistence via `localStorage`.
- **Custom Pagination & Filtering**: Interactive and performant product filtering with a custom-built responsive dropdown overlay and a smart pill-based pagination system.
- **Cart Management**: Full cart functionality including adding, removing, quantity adjustments, and calculation of taxes/shipping.
- **Skeleton Loaders**: Modern shimmer effects for loading states instead of generic spinners.

## 🚀 Technologies

* **Core**: React 19, Vite
* **Routing**: React Router DOM v7
* **State**: Redux Toolkit
* **Styling**: Tailwind CSS, PostCSS
* **Animations**: Framer Motion
* **API Interaction**: Axios (Integration with [DummyJSON](https://dummyjson.com))

## 📦 Installation & Setup

1. **Clone the repository** (if applicable) or download the source code.
2. **Navigate to the project directory**:
   ```bash
   cd ecommerce-store
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🛡️ Authentication (Demo)

The application features a mock authentication system for demonstration purposes.
- **Username:** `admin`
- **Password:** `admin`

Using these exact credentials will bypass the external dummy API and log you in instantly.

## 🏗️ Project Structure overview

```text
src/
 ├── app/                 # Redux store configuration
 ├── components/          # Reusable UI components (Navbar, ProductCard, CartItem, Pagination, ShimmerCard, ThemeToggle)
 ├── features/            # Domain-driven feature slices (auth, products, cart)
 ├── pages/               # Route components (Home, Login, Checkout)
 ├── routes/              # Application routing definitions
 ├── App.jsx              # Root layout and theme provider
 └── main.jsx             # React entry point
```

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the app into static files for production.
- `npm run lint`: Runs ESLint to identify and report on patterns in JavaScript.
- `npm run preview`: Locally preview the production build.
