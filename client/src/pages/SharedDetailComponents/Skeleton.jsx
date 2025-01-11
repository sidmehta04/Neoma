import { memo } from "react";

// Loading Skeleton Components
const LoadingSkeletonCard = memo(({ theme }) => (
  <div className="animate-pulse space-y-4">
    <div
      className={`h-10 ${
        theme === "light" ? "bg-gray-200" : "bg-gray-700"
      } rounded w-3/4`}
    ></div>
    <div
      className={`h-8 ${
        theme === "light" ? "bg-gray-200" : "bg-gray-700"
      } rounded w-1/2`}
    ></div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`h-20 ${
            theme === "light" ? "bg-gray-200" : "bg-gray-700"
          } rounded`}
        ></div>
      ))}
    </div>
  </div>
));
export default LoadingSkeletonCard;
