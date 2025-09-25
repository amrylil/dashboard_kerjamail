import React from "react";

const HeaderSkeleton: React.FC = () => {
  return (
    <header className="bg-red-50 px-6 py-2 shadow-sm my-3 mr-3 rounded-lg">
      <div className="flex items-center justify-between animate-pulse">
        {/* Search Skeleton */}
        <div className="h-11 w-80 rounded-xl bg-gray-200"></div>

        {/* Actions Skeleton */}
        <div className="flex items-center space-x-3">
          {/* Action Buttons Skeleton */}
          <div className="h-[42px] w-[130px] rounded-lg bg-gray-200"></div>
          <div className="h-[42px] w-[120px] rounded-lg bg-gray-200"></div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Notification Icons Skeleton */}
          <div className="flex items-center space-x-1">
            <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
            <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* User Profile Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200"></div>
            <div className="text-left">
              <div className="h-4 w-24 rounded bg-gray-200 mb-1.5"></div>
              <div className="h-3 w-16 rounded bg-gray-200"></div>
            </div>
            <div className="h-4 w-4 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
