import React from "react";
import type { User } from "../../types/users";

interface UserFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  initialData?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={initialData?.name || ""}
          placeholder="e.g., John Doe"
          required
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={initialData?.email || ""}
          placeholder="e.g., john.doe@example.com"
          required
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          defaultValue={initialData?.role || "Member"}
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
        >
          <option>Owner</option>
          <option>Admin</option>
          <option>Member</option>
        </select>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700"
        >
          Save User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
