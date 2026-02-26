import { memo, useCallback } from "react";
import { motion } from "framer-motion";

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  // Render a smart block of numbers to avoid too many pages
  const getPageNumbers = useCallback(() => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <div className="flex items-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 p-2 rounded-full shadow-lg dark:shadow-2xl dark:shadow-black/20">
        {/* Previous Button */}
        <motion.button
          whileHover={{
            scale: currentPage === 1 ? 1 : 1.05,
            backgroundColor:
              currentPage === 1 ? "" : "rgba(243, 232, 255, 0.5)",
          }} // fuchsia-50
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`h-10 px-4 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
            currentPage === 1
              ? "text-gray-400 dark:text-slate-600 cursor-not-allowed"
              : "text-gray-700 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 dark:hover:bg-slate-700/50"
          }`}
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </motion.button>

        <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2" />

        {/* Page Pills */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-10 text-center text-gray-400 dark:text-slate-500 font-bold"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <motion.button
                key={page}
                onClick={() => onPageChange(page)}
                layout
                whileHover={!isActive ? { scale: 1.1, y: -2 } : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg shadow-fuchsia-500/40 z-10"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePage"
                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-cyan-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-20">{page}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2" />

        {/* Next Button */}
        <motion.button
          whileHover={{
            scale: currentPage === totalPages ? 1 : 1.05,
            backgroundColor:
              currentPage === totalPages ? "" : "rgba(243, 232, 255, 0.5)",
          }} // fuchsia-50
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`h-10 px-4 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 dark:text-slate-600 cursor-not-allowed"
              : "text-gray-700 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 dark:hover:bg-slate-700/50"
          }`}
        >
          Next
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
