import React from "react";
import type { Mailbox } from "../../types/mailboxes";

interface MailboxFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  initialData?: Mailbox | null;
  availableDomains: string[];
}

const MailboxForm: React.FC<MailboxFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  availableDomains,
}) => {
  const isEditMode = !!initialData;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Email Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="username"
            defaultValue={initialData?.email.split("@")[0] || ""}
            placeholder="username"
            required
            readOnly={isEditMode} // Username tidak bisa diubah saat edit
            className="w-1/2 px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl disabled:bg-slate-100 dark:disabled:bg-slate-700"
            disabled={isEditMode}
          />
          <span className="self-center text-slate-500">@</span>
          <select
            id="domain"
            name="domain"
            defaultValue={initialData?.domain || availableDomains[0]}
            disabled={isEditMode}
            className="w-1/2 px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl appearance-none disabled:bg-slate-100 dark:disabled:bg-slate-700"
          >
            {availableDomains.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder={
            isEditMode
              ? "Leave blank to keep current password"
              : "Enter a strong password"
          }
          required={!isEditMode} // Wajib diisi saat membuat baru
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl"
        />
      </div>

      <div>
        <label
          htmlFor="quota"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Quota (GB)
        </label>
        <select
          id="quota"
          name="quota"
          defaultValue={initialData?.quotaGB || 5}
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl appearance-none"
        >
          <option value="2">2 GB</option>
          <option value="5">5 GB</option>
          <option value="10">10 GB</option>
          <option value="unlimited">Unlimited</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border rounded-xl font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium"
        >
          {isEditMode ? "Save Changes" : "Create Mailbox"}
        </button>
      </div>
    </form>
  );
};

export default MailboxForm;
