import { useState, useMemo } from "react";
import type {
  DomainStat,
  TopUserStat,
  ActivityLog,
  ReportStats,
} from "../types/reports";
import type { FilterConfig } from "../components/ui/GenericTable";

const initialDomainStats: DomainStat[] = [
  {
    id: 1,
    domainName: "kerjamail.co",
    mailboxCount: 15,
    storageUsedGB: 75,
    storageQuotaGB: 200,
  },
  {
    id: 2,
    domainName: "example.com",
    mailboxCount: 5,
    storageUsedGB: 12,
    storageQuotaGB: 50,
  },
  {
    id: 3,
    domainName: "new-project.io",
    mailboxCount: 22,
    storageUsedGB: 150,
    storageQuotaGB: 250,
  },
];

const initialTopUsers: TopUserStat[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@kerjamail.co",
    storageUsedGB: 12.5,
  },
  {
    id: 2,
    name: "Project Manager",
    email: "pm@new-project.io",
    storageUsedGB: 10.1,
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@kerjamail.co",
    storageUsedGB: 8.7,
  },
  {
    id: 4,
    name: "Marketing Team",
    email: "marketing@new-project.io",
    storageUsedGB: 7.5,
  },
];

const initialActivityLogs: ActivityLog[] = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    actor: "john.doe@kerjamail.co",
    action: "LOGIN",
    details: "IP: 103.22.11.5",
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    actor: "jane.smith@kerjamail.co",
    action: "PASSWORD_RESET",
    details: "Success",
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    actor: "admin@system",
    action: "CREATE_MAILBOX",
    details: "user: new.user@example.com",
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    actor: "admin@system",
    action: "DELETE_MAILBOX",
    details: "user: old.user@kerjamail.co",
  },
];

export const useReports = () => {
  const [domainStats] = useState<DomainStat[]>(initialDomainStats);
  const [topUsers] = useState<TopUserStat[]>(initialTopUsers);
  const [activityLogs] = useState<ActivityLog[]>(initialActivityLogs);

  const reportStats: ReportStats = useMemo(() => {
    const totalStorage = domainStats.reduce(
      (sum, d) => sum + d.storageUsedGB,
      0
    );
    const totalMailboxes = domainStats.reduce(
      (sum, d) => sum + d.mailboxCount,
      0
    );
    const logEventsToday = activityLogs.length;

    return {
      totalDomains: domainStats.length,
      totalStorageUsedGB: Math.round(totalStorage),
      totalMailboxes,
      logEventsToday,
    };
  }, [domainStats, activityLogs]);

  const filterConfig: FilterConfig<ActivityLog> = {
    action: [
      { label: "Login", value: "LOGIN" },
      { label: "Password Reset", value: "PASSWORD_RESET" },
      { label: "Create Mailbox", value: "CREATE_MAILBOX" },
      { label: "Delete Mailbox", value: "DELETE_MAILBOX" },
    ],
  };

  return { domainStats, topUsers, activityLogs, reportStats, filterConfig };
};
