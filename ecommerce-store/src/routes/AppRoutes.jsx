import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
