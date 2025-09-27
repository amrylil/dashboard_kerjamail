import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const MailboxActivityChart = () => {
  const activityData = [
    { name: "Jan", received: 4000, sent: 2400 },
    { name: "Feb", received: 3000, sent: 1398 },
    { name: "Mar", received: 2000, sent: 9800 },
    { name: "Apr", received: 2780, sent: 3908 },
    { name: "May", received: 1890, sent: 4800 },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm dark:border dark:border-slate-700">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100">
        Mailbox Activity
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-400">
        Received vs. Sent (Last 5 Months)
      </p>
      <div className="h-48 mt-4 dark:text-slate-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activityData}
            margin={{ top: 10, right: 5, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="name"
              tick={{ fill: "currentColor", fontSize: 12 }}
              strokeOpacity={0.4}
            />
            <YAxis
              tick={{ fill: "currentColor", fontSize: 12 }}
              strokeOpacity={0.4}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(5px)",
                border: "1px solid #ddd",
                borderRadius: "0.5rem",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />
            <Bar
              dataKey="received"
              fill="#60a5fa"
              name="Received"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="sent"
              fill="#3b82f6"
              name="Sent"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
