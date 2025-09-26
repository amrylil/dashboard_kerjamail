export type DnsVerificationStatus = "verified" | "unverified";

export type DnsRecord = {
  type: "MX" | "TXT" | "CNAME";
  host: string;
  value: string;
  status: DnsVerificationStatus;
};

export type Domain = {
  id: number;
  domainName: string;
  status: "Active" | "Pending DNS" | "Suspended";
  expiryDate: string;
  activeMailboxes: number;
  createdAt: string;
  dnsRecords: DnsRecord[];
};

export type DomainStats = {
  total: number;
  active: number;
  pending: number;
  suspended: number;
};
