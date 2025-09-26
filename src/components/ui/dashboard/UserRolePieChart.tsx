import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const UserRolePieChart = ({ stats }: { stats: any }) => {
  const data = [
    { name: "Admins", value: stats.admins },
    { name: "Members", value: stats.members },
  ];
  const COLORS = ["#3b82f6", "#60a5fa"];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm dark:border dark:border-slate-700">
      {" "}
      <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100">
        User Role Distribution
      </h3>
      <div className="h-48 mt-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
