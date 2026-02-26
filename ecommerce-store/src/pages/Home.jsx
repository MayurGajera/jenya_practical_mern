import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchProducts,
  fetchCategories,
  setCategory,
  setPage,
  fetchProductsByCategory,
} from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import ShimmerCard from "../components/ShimmerCard";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items,
    categories,
    loading,
    error,
    selectedCategory,
    skip,
    limit,
    total,
  } = useSelector((state) => state.products);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory === "all") {
      dispatch(fetchProducts({ limit, skip }));
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory, skip, limit]);

  const handleCategoryChange = useCallback(
    (category) => {
      dispatch(setCategory(category));
      setIsDropdownOpen(false);
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch],
  );

  const { currentPage, totalPages } = useMemo(
    () => ({
      currentPage: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit),
    }),
    [skip, limit, total],
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0 relative z-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
            Discover{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-cyan-600 dark:from-fuchsia-400 dark:to-cyan-400">
              Extraordinary
            </span>
          </h1>
          <p className="mt-2 text-gray-500 dark:text-slate-400 text-lg transition-colors duration-300">
            Curated products for your lifestyle.
          </p>
        </div>

        <div className="relative z-20" ref={dropdownRef}>
          <div className="flex items-center space-x-4 bg-white/80 dark:bg-slate-800/50 p-2 rounded-2xl border border-gray-200 dark:border-slate-700/50 backdrop-blur-sm self-start md:self-auto transition-colors duration-300 shadow-sm relative">
            <label className="pl-3 text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-widest hidden sm:block">
              Category
            </label>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full sm:w-56 px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
            >
              <span className="truncate font-medium">
                {selectedCategory === "all"
                  ? "All Collections"
                  : selectedCategory.replace("-", " ").toUpperCase()}
              </span>
              <motion.svg
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-gray-400 dark:text-slate-500 ml-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>
          </div>

          {/* Custom Dropdown Panel */}
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="absolute right-0 sm:right-auto sm:left-0 mt-3 w-64 md:w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200 dark:border-slate-700 shadow-2xl dark:shadow-black/50 rounded-2xl overflow-hidden py-2 z-50 origin-top-right sm:origin-top-left"
            >
              <div className="max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
                {/* All Collections Option */}
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-left px-4 py-3 rounded-xl mb-1 flex items-center justify-between transition-all duration-200 ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-fuchsia-100 to-cyan-100 dark:from-fuchsia-900/40 dark:to-cyan-900/40 text-fuchsia-900 dark:text-fuchsia-100 font-bold shadow-sm"
                      : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span>All Collections</span>
                  {selectedCategory === "all" && (
                    <motion.div
                      layoutId="check"
                      className="w-2 h-2 rounded-full bg-fuchsia-500"
                    />
                  )}
                </button>

                {/* Categories */}
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl mb-1 flex items-center justify-between transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-fuchsia-100 to-cyan-100 dark:from-fuchsia-900/40 dark:to-cyan-900/40 text-fuchsia-900 dark:text-fuchsia-100 font-bold shadow-sm"
                        : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <span>{cat.replace("-", " ").toUpperCase()}</span>
                    {selectedCategory === cat && (
                      <motion.div
                        layoutId="check"
                        className="w-2 h-2 rounded-full bg-fuchsia-500"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </motion.div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 rounded-2xl p-6 mb-8 text-center"
        >
          <p className="text-lg text-red-600 dark:text-red-400 font-medium">
            Failed to load products: {error}
          </p>
        </motion.div>
      ) : items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 dark:bg-slate-800/30 rounded-3xl border border-gray-200 dark:border-slate-700/50 border-dashed p-16 text-center shadow-sm"
        >
          <svg
            className="mx-auto h-16 w-16 text-gray-400 dark:text-slate-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-xl text-gray-500 dark:text-slate-400 font-medium tracking-wide">
            No products found in this category.
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {selectedCategory === "all" && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default Home;
