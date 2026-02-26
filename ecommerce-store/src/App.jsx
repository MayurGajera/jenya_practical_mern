import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800/50 py-8 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 dark:text-slate-400 text-sm font-medium tracking-wide">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-fuchsia-600 dark:text-fuchsia-400">
                ZenStore
              </span>{" "}
              E-Commerce. Created by Mayur Gajera
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
