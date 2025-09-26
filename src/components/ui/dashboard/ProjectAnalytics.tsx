import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export const ProjectAnalytics = () => {
  const weeklyData = [
    { name: "S", opens: 600 },
    { name: "M", opens: 750 },
    { name: "T", opens: 500 },
    { name: "W", opens: 900 },
    { name: "T", opens: 800 },
    { name: "F", opens: 650 },
    { name: "S", opens: 700 },
  ];
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm dark:border dark:border-slate-700 col-span-1 lg:col-span-2">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100">
        Email Analytics
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-400">
        Open rates for the last 7 days
      </p>
      <div className="mt-6 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "rgb(100 116 139)" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(241, 245, 249, 0.5)" }}
              contentStyle={{
                borderRadius: "0.75rem",
                border: "1px solid #e2e8f0",
              }}
            />
            <Bar dataKey="opens" barSize={32} radius={[8, 8, 8, 8]}>
              {weeklyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "W" ? "#3b82f6" : "#e5e7eb"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
