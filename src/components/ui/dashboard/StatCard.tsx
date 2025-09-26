const ArrowUpRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export const StatCard = ({
  title,
  value,
  change,
  isPrimary,
}: {
  title: string;
  value: string;
  change: string;
  isPrimary?: boolean;
}) => {
  const cardClasses = `p-5 rounded-2xl shadow-sm dark:border dark:border-slate-700 flex flex-col justify-between ${
    isPrimary
      ? "bg-blue-700 text-white border-transparent"
      : "bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100"
  }`;
  const changeClasses = `text-xs px-2 py-1 rounded-full flex items-center ${
    isPrimary
      ? "bg-white/20"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
  }`;
  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center">
        <p
          className={`font-medium ${
            isPrimary ? "text-white/90" : "text-gray-500 dark:text-slate-400"
          }`}
        >
          {title}
        </p>
        <div
          className={`p-1.5 rounded-full ${
            isPrimary ? "bg-white/20" : "bg-gray-100 dark:bg-slate-700"
          }`}
        >
          <ArrowUpRightIcon />
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-bold mt-2">{value}</h2>
        <div className="mt-4 flex">
          <span className={changeClasses}>{change}</span>
        </div>
      </div>
    </div>
  );
};
