export const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => (
  <div
    className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/50 rounded-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  </div>
);
