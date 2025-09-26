import type { Mailbox } from "../../../types/mailboxes";

export const TopStorageUsers = ({ mailboxes }: { mailboxes: Mailbox[] }) => {
  const topUsers = mailboxes
    .sort((a, b) => b.storageUsedGB - a.storageUsedGB)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm dark:border dark:border-slate-700">
      {" "}
      <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100">
        Top Storage Users
      </h3>
      <ul className="mt-4 space-y-4">
        {topUsers.map((user) => (
          <li key={user.id}>
            <p className="font-semibold text-gray-800 dark:text-slate-100">
              {user.email}
            </p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {user.storageUsedGB.toFixed(1)} GB Used
              </p>
              <p className="text-xs font-medium text-blue-600">
                {user.quotaGB === Infinity ? "unlimited" : user.quotaGB} GB
                Quota
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
