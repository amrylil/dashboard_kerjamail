export type User = {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  status: "Active" | "Suspended";
  joined: string;
};

export type UserStats = {
  total: number;
  admins: number;
  members: number;
  suspended: number;
};
