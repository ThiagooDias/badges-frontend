import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse-fast bg-slate-600 rounded-md h-64 w-64">
      {/* Skeleton loader content */}
    </div>
  );
};

export default SkeletonLoader;
