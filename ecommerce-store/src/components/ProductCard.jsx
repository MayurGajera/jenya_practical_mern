import { memo } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700/50 backdrop-blur-sm group flex flex-col transition-all duration-300"
    >
      <div className="relative pb-[70%] h-0 bg-white overflow-hidden border-b border-gray-50 dark:border-transparent">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 dark:from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between relative z-10 transition-colors duration-300">
        <div>
          <div className="text-xs bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 inline-block px-2 py-1 rounded-md mb-3 uppercase font-bold tracking-wider transition-colors duration-300">
            {product.category.replace("-", " ")}
          </div>
          <h3
            className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 line-clamp-1 transition-colors duration-300"
            title={product.title}
          >
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed transition-colors duration-300">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-cyan-600 dark:from-fuchsia-400 dark:to-cyan-400 transition-colors duration-300">
            ${product.price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(addToCart(product))}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-fuchsia-500 shadow-lg shadow-fuchsia-500/30 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
