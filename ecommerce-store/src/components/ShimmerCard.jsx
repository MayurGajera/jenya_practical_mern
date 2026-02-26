import { motion } from "framer-motion";

const ShimmerCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700/50 flex flex-col h-full animate-pulse"
    >
      {/* Image Skeleton */}
      <div className="relative pb-[70%] h-0 bg-gray-200 dark:bg-slate-700 flex-shrink-0" />

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="w-full">
          {/* Category Pill Skeleton */}
          <div className="w-24 h-6 bg-gray-200 dark:bg-slate-700 rounded-md mb-3" />

          {/* Title Skeleton */}
          <div className="w-full h-6 bg-gray-200 dark:bg-slate-700 rounded-md mb-2" />

          {/* Description Skeleton (2 lines) */}
          <div className="w-full h-4 bg-gray-200 dark:bg-slate-700 rounded-md mb-2" />
          <div className="w-3/4 h-4 bg-gray-200 dark:bg-slate-700 rounded-md mb-4" />
        </div>

        {/* Footer: Price & Button Skeleton */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="w-16 h-8 bg-gray-200 dark:bg-slate-700 rounded-md" />
          <div className="w-20 h-10 bg-gray-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default ShimmerCard;
