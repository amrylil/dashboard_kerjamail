import React from "react";

interface DomainFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const DomainForm: React.FC<DomainFormProps> = ({ onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 dark:text-slate-50">
      <div>
        <label
          htmlFor="domainName"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          Domain Name
        </label>
        <input
          type="text"
          name="domainName"
          id="domainName"
          placeholder="e.g., example.com"
          required
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-xs text-slate-500">
          Enter the domain you want to add. You must have access to its DNS
          settings.
        </p>
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
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium"
        >
          Add Domain
        </button>
      </div>
    </form>
  );
};

export default DomainForm;
