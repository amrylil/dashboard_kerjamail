const SkeletonRow = () => (
  <div className="flex items-center gap-4 border-b border-gray-200 p-4">
    {/* Avatar & Name Skeleton */}
    <div className="flex flex-1 items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-gray-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3 rounded bg-gray-200"></div>
        <div className="h-2 w-2/3 rounded bg-gray-200"></div>
      </div>
    </div>
    {/* Other Cells Skeleton */}
    <div className="h-4 w-20 rounded bg-gray-200"></div>
    <div className="h-4 w-24 rounded bg-gray-200"></div>
    <div className="h-4 w-28 rounded bg-gray-200"></div>
    <div className="h-6 w-20 rounded-full bg-gray-200"></div>
  </div>
);

const TableSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white">
      {/* Skeleton Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 p-4">
        <div className="h-4 flex-1 rounded bg-gray-200"></div>
        <div className="h-4 w-20 rounded bg-gray-200"></div>
        <div className="h-4 w-24 rounded bg-gray-200"></div>
        <div className="h-4 w-28 rounded bg-gray-200"></div>
        <div className="h-4 w-20 rounded bg-gray-200"></div>
      </div>
      {/* Skeleton Body */}
      <div>
        {[...Array(6)].map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
