import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "../features/auth/authSlice";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800/50 shadow-sm dark:shadow-lg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center group relative overflow-hidden rounded-lg p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 rounded-lg blur-xl" />
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 tracking-tight"
              >
                ZenStore
              </motion.span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            {isAuthenticated ? (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 dark:text-slate-300 font-medium hidden sm:block tracking-wide"
                >
                  Welcome,{" "}
                  <span className="text-gray-900 dark:text-white font-bold">
                    {user?.firstName || user?.username}
                  </span>
                </motion.span>

                <Link
                  to="/checkout"
                  className="relative p-2 text-gray-500 hover:text-fuchsia-600 dark:text-slate-400 dark:hover:text-fuchsia-400 transition-colors group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </motion.div>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-lg shadow-lg shadow-fuchsia-500/50"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="ml-2 px-4 sm:px-5 py-2 sm:py-2.5 border border-gray-200 dark:border-slate-700 text-sm font-bold rounded-xl text-gray-700 dark:text-slate-300 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors shadow-sm"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-fuchsia-500/25 relative overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            )}

            <div className="pl-2 border-l border-gray-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
