import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
      className="flex py-6 px-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
    >
      <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl overflow-hidden p-2 border border-gray-100 dark:border-slate-700">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-center object-contain mix-blend-multiply"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col sm:ml-6">
        <div>
          <div className="flex justify-between">
            <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 line-clamp-2 transition-colors duration-300">
              {item.title}
            </h4>
            <p className="ml-4 text-lg font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-fuchsia-600 dark:text-fuchsia-400 capitalize font-medium transition-colors duration-300">
            {item.category.replace("-", " ")}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
            ${item.price.toFixed(2)} each
          </p>
        </div>

        <div className="mt-4 flex-1 flex items-end justify-between">
          <div className="flex items-center bg-gray-50 dark:bg-slate-900 rounded-lg p-1 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => {
                if (item.quantity === 1) {
                  dispatch(removeFromCart(item.id));
                } else {
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: item.quantity - 1,
                    }),
                  );
                }
              }}
              className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:text-gray-900 dark:hover:text-white transition-all focus:outline-none"
            >
              -
            </motion.button>
            <span className="w-10 text-center text-gray-900 dark:text-white font-bold transition-colors duration-300">
              {item.quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
                )
              }
              className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:text-gray-900 dark:hover:text-white transition-all focus:outline-none"
            >
              +
            </motion.button>
          </div>

          <div className="ml-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-sm font-bold text-red-400 hover:text-red-300 flex items-center transition-colors bg-red-400/10 px-3 py-1.5 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Remove</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default CartItem;
