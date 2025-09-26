export type DomainStat = {
  id: number;
  domainName: string;
  mailboxCount: number;
  storageUsedGB: number;
  storageQuotaGB: number;
};

export type TopUserStat = {
  id: number;
  email: string;
  name: string;
  storageUsedGB: number;
};

export type ActivityLogAction =
  | "LOGIN"
  | "PASSWORD_RESET"
  | "CREATE_MAILBOX"
  | "DELETE_MAILBOX";

export type ActivityLog = {
  id: number;
  timestamp: string;
  actor: string;
  action: ActivityLogAction;
  details: string;
};

export type ReportStats = {
  totalDomains: number;
  totalStorageUsedGB: number;
  totalMailboxes: number;
  logEventsToday: number;
};
