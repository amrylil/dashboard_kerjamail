export type Mailbox = {
  id: number;
  email: string;
  domain: string;
  quotaGB: number | "unlimited";
  storageUsedGB: number;
  status: "Active" | "Suspended";
  lastLogin: string;
  owner?: string;
};

export type MailboxStats = {
  activeCount: number;
  suspendedCount: number;
  totalStorageUsedGB: number;
  totalMailboxes: number;
};
