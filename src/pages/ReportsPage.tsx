import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type {
  DomainStat,
  TopUserStat,
  ActivityLog,
  ActivityLogAction,
} from "../types/reports";
import { useReports } from "../hooks/useReports";

import GenericTable from "../components/ui/GenericTable";
import { StatCard } from "../components/ui/StatCard";

import {
  BarChart2,
  HardDrive,
  Mailbox,
  ShieldAlert,
  LogIn,
  KeyRound,
  UserPlus,
  UserMinus,
  Download,
} from "lucide-react";

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const StorageBar = ({ used, quota }: { used: number; quota: number }) => {
  const percentage = (used / quota) * 100;
  return (
    <div className="w-full">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {used} GB / {quota} GB
      </span>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const ActionDisplay = ({ action }: { action: ActivityLogAction }) => {
  const styles = {
    LOGIN: { icon: LogIn, color: "text-green-800 bg-green-100" },
    PASSWORD_RESET: { icon: KeyRound, color: "text-yellow-800 bg-yellow-100" },
    CREATE_MAILBOX: { icon: UserPlus, color: "text-blue-800 bg-blue-100" },
    DELETE_MAILBOX: { icon: UserMinus, color: "text-red-800 bg-red-100" },
  };
  const { icon: Icon, color } = styles[action];
  return (
    <span
      className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold ${color}`}
    >
      <Icon className="w-3 h-3" />
      {action.replace("_", " ")}
    </span>
  );
};

const ReportsPage = () => {
  const { domainStats, topUsers, activityLogs, reportStats, filterConfig } =
    useReports();

  const domainColumns = useMemo<ColumnDef<DomainStat>[]>(
    () => [
      { header: "Domain Name", accessorKey: "domainName", enableSorting: true },
      { header: "Mailboxes", accessorKey: "mailboxCount", enableSorting: true },
      {
        header: "Storage Usage",
        accessorKey: "storageUsedGB",
        enableSorting: true,
        cell: ({ row }) => (
          <StorageBar
            used={row.original.storageUsedGB}
            quota={row.original.storageQuotaGB}
          />
        ),
      },
    ],
    []
  );

  const topUserColumns = useMemo<ColumnDef<TopUserStat>[]>(
    () => [
      {
        header: "User",
        accessorKey: "name",
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {row.original.name}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {row.original.email}
            </div>
          </div>
        ),
      },
      {
        header: "Storage Used",
        accessorKey: "storageUsedGB",
        cell: ({ row }) => `${row.original.storageUsedGB} GB`,
      },
    ],
    []
  );

  const logColumns = useMemo<ColumnDef<ActivityLog>[]>(
    () => [
      {
        header: "Timestamp",
        accessorKey: "timestamp",
        cell: ({ row }) => formatDate(row.original.timestamp),
      },
      { header: "Actor", accessorKey: "actor" },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: true,
        filterFn: "arrIncludesSome",
        cell: ({ row }) => <ActionDisplay action={row.original.action} />,
      },
      { header: "Details", accessorKey: "details" },
    ],
    []
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Reports & Monitoring
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Analyze usage and track activities across your organization
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 shadow-lg">
            <Download className="w-5 h-5" />
            Download Reports
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            label="Total Domains"
            value={reportStats.totalDomains}
            color="blue"
            icon={<BarChart2 className="text-green-600" />}
          />
          <StatCard
            label="Total Storage Used"
            value={reportStats.totalStorageUsedGB}
            color="blue"
            icon={<HardDrive className="text-blue-600" />}
          />
          <StatCard
            label="Total Mailboxes"
            value={reportStats.totalMailboxes}
            color="green"
            icon={<Mailbox className="text-green-600" />}
          />
          <StatCard
            label="Log Events"
            value={reportStats.logEventsToday}
            color="red"
            icon={<ShieldAlert className="text-red-600" />}
          />
        </div>

        {/* DOMAIN STATISTICS */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Domain Statistics
          </h2>
          <GenericTable data={domainStats} columns={domainColumns} />
        </div>

        {/* MAILBOX & ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Top Mailbox Usage
            </h2>
            <GenericTable data={topUsers} columns={topUserColumns} />
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Activity Log
            </h2>
            <GenericTable
              data={activityLogs}
              columns={logColumns}
              enableSearch
              searchPlaceholder="Search logs..."
              enableFilter
              filterConfig={filterConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
