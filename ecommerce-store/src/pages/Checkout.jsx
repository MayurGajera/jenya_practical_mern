import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clearCart } from "../features/cart/cartSlice";
import CartItem from "../components/CartItem";

const Checkout = () => {
  const { items, totalPrice, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Thank you for your purchase! Your order has been placed.");
    dispatch(clearCart());
    navigate("/");
  };

  const { tax, shipping, finalTotal } = useMemo(() => {
    const calculatedTax = totalPrice * 0.08;
    const calculatedShipping = totalPrice > 50 || items.length === 0 ? 0 : 10;
    return {
      tax: calculatedTax,
      shipping: calculatedShipping,
      finalTotal: totalPrice + calculatedTax + calculatedShipping,
    };
  }, [totalPrice, items.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 dark:bg-slate-900 min-h-[calc(100vh-80px)] py-12 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-10 text-center transition-colors duration-300"
        >
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-cyan-600 dark:from-fuchsia-400 dark:to-cyan-400">
            Cart
          </span>
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/80 dark:bg-slate-800/40 rounded-3xl shadow-xl dark:shadow-2xl p-12 text-center border border-gray-200 dark:border-slate-700/50 backdrop-blur-xl max-w-2xl mx-auto transition-colors duration-300"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-gray-300 dark:text-slate-600 mb-6 drop-shadow-2xl transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-md mx-auto transition-colors duration-300">
              Looks like you haven't added any items to your cart yet. Discover
              extraordinary products on our platform.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 font-bold rounded-xl text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-fuchsia-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white/80 dark:bg-slate-800/40 shadow-xl dark:shadow-2xl dark:shadow-black/20 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-700/50 backdrop-blur-md transition-colors duration-300"
              >
                <ul className="divide-y divide-gray-100 dark:divide-slate-700/50">
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            </div>

            {/* Order summary */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mt-16 bg-white/80 dark:bg-slate-800/40 rounded-3xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-slate-700/50 backdrop-blur-xl px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4 lg:sticky lg:top-28 transition-colors duration-300"
            >
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Order Summary
              </h2>

              <dl className="space-y-4 text-sm text-gray-600 dark:text-slate-300 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <dt>Subtotal ({totalItems} items)</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-slate-700/50 pt-4 transition-colors duration-300">
                  <dt className="flex items-center">
                    <span>Shipping Charges</span>
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {shipping === 0 ? (
                      <span className="text-cyan-600 dark:text-cyan-400 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-400/10 rounded-full text-xs font-bold uppercase tracking-wider">
                        Free
                      </span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-slate-700/50 pt-4 transition-colors duration-300">
                  <dt className="flex items-center">
                    <span>GST (8%)</span>
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-300 dark:border-slate-600 pt-6 text-xl font-bold transition-colors duration-300">
                  <dt className="text-gray-900 dark:text-white">
                    Total Amount
                  </dt>
                  <dd className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-cyan-600 dark:from-fuchsia-400 dark:to-cyan-400 text-3xl">
                    ${finalTotal.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 border border-transparent rounded-xl shadow-lg shadow-fuchsia-500/25 py-4 px-4 text-lg font-bold text-white hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-fuchsia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Checkout Securely
                </motion.button>
              </div>

              <div className="mt-6 flex justify-center text-sm text-slate-400">
                <p>
                  or{" "}
                  <Link
                    to="/"
                    className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <p className="text-xs text-center text-slate-500 flex items-center justify-center font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1.5"
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
                  Transactions are secured and encrypted.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Checkout;
