import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser, clearError } from "../features/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(loginUser({ username, password, expiresInMins: 60 }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 dark:bg-transparent transition-colors duration-300"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-400/20 dark:bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-md w-full space-y-8 bg-white/80 dark:bg-slate-800/40 p-10 rounded-3xl shadow-xl dark:shadow-2xl dark:shadow-black/50 border border-gray-200 dark:border-slate-700/50 backdrop-blur-xl relative z-10 transition-colors duration-300"
      >
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.1,
            }}
            className="h-16 w-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-fuchsia-500/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
            Sign in to access your ZenStore account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 p-4 rounded-xl"
            >
              <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
                {error}
              </p>
            </motion.div>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 dark:text-slate-300 block mb-2 transition-colors duration-300"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 placeholder-gray-400 dark:placeholder-slate-500 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:focus:bg-slate-900 transition-all sm:text-sm"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-slate-300 block mb-2 transition-colors duration-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 placeholder-gray-400 dark:placeholder-slate-500 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:focus:bg-slate-900 transition-all sm:text-sm"
                placeholder="e.g. admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500 shadow-lg shadow-fuchsia-500/25 transition-all ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Sign in to account"
              )}
            </motion.button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-slate-500 transition-colors duration-300">
              Demo credentials "admin" auto-filled for your convenience.
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
