import React from "react";

// --- Helper Icons (menggunakan SVG inline) ---
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

const PlusIcon = () => (
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
    className="h-4 w-4 mr-2"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- Komponen-komponen Baru ---

const StatCard = ({
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
  const cardClasses = `p-5 rounded-2xl shadow-sm flex flex-col justify-between ${
    isPrimary ? "bg-blue-700 text-white" : "bg-white text-gray-800"
  }`;
  const changeClasses = `text-xs px-2 py-1 rounded-full flex items-center ${
    isPrimary ? "bg-white/20" : "bg-blue-100 text-blue-800"
  }`;

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center">
        <p
          className={`font-medium ${
            isPrimary ? "text-white/90" : "text-gray-500"
          }`}
        >
          {title}
        </p>
        <div
          className={`p-1.5 rounded-full ${
            isPrimary ? "bg-white/20" : "bg-gray-100"
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

const ProjectAnalytics = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm col-span-1 lg:col-span-2">
    <h3 className="font-semibold text-lg">Email Analytics</h3>
    <p className="text-sm text-gray-500">Open rates for the last 7 days</p>
    <div className="mt-6 flex justify-between items-end h-32">
      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
        const height = [60, 75, 50, 90, 80, 65, 70][i];
        const isToday = day === "W";
        return (
          <div key={day} className="flex flex-col items-center">
            <div
              className={`w-8 rounded-t-lg ${
                isToday ? "bg-blue-500" : "bg-gray-200"
              }`}
              style={{ height: `${height}%` }}
            ></div>
            <p className="mt-2 text-xs font-medium text-gray-500">{day}</p>
          </div>
        );
      })}
    </div>
  </div>
);

const TeamCollaboration = () => {
  const team = [
    {
      name: "Alexandra Deff",
      task: "Designing new email template",
      status: "Completed",
      avatar: "https://placehold.co/40x40/DBEAFE/1E3A8A?text=AD",
    },
    {
      name: "Edwin Adenike",
      task: "Setup new domain verification",
      status: "In Progress",
      avatar: "https://placehold.co/40x40/DBEAFE/1E3A8A?text=EA",
    },
    {
      name: "Isaac Oluwatemilorun",
      task: "Drafting weekly newsletter",
      status: "Pending",
      avatar: "https://placehold.co/40x40/DBEAFE/1E3A8A?text=IO",
    },
  ];
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Team Collaboration</h3>
        <button className="text-sm bg-gray-100 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-200">
          + Add Member
        </button>
      </div>
      <ul className="mt-4 space-y-4">
        {team.map((member) => (
          <li key={member.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.task}</p>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                member.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : member.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {member.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProjectProgress = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center">
    <h3 className="font-semibold text-lg self-start">Campaign Progress</h3>
    <div className="relative w-40 h-40 mt-4">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeDasharray="41, 100"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-3xl font-bold text-gray-800">41%</span>
        <p className="text-sm text-gray-500">Sent</p>
      </div>
    </div>
    <div className="flex space-x-4 mt-4 text-sm">
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
        Completed
      </div>
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>In
        Progress
      </div>
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>Pending
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="  min-h-screen font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="flex items-center justify-center bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-blue-800 transition">
            <PlusIcon />
            New Broadcast
          </button>
          <button className="bg-white text-gray-700 px-4 py-2.5 rounded-xl font-semibold shadow-sm border hover:bg-gray-50 transition">
            Import Data
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Domains"
            value="12"
            change="+2 from last month"
            isPrimary={true}
          />
          <StatCard
            title="Active Mailboxes"
            value="58"
            change="+5 from last month"
          />
          <StatCard
            title="Broadcasts Sent"
            value="1,204"
            change="+150 from last month"
          />
          <StatCard
            title="Pending Verifications"
            value="2"
            change="On Discuss"
          />
        </div>

        <ProjectAnalytics />
        <div className="bg-white p-6 rounded-2xl shadow-sm col-span-1 lg:col-span-2">
          <h3 className="font-semibold text-lg">Reminders</h3>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold">Meeting with Marketing Team</p>
            <p className="text-sm text-gray-600">Time: 02:00 PM - 04:00 PM</p>
            <button className="w-full mt-3 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800">
              Start Meeting
            </button>
          </div>
        </div>

        <TeamCollaboration />
        <ProjectProgress />

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Upcoming Campaigns</h3>
            <button className="text-sm bg-gray-100 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-200">
              + New
            </button>
          </div>
          {/* List of campaigns */}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
