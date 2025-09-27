import React from "react";
import { Settings, CreditCard } from "lucide-react";

const SettingsCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const SettingsPage = () => {
  return (
    <div className="min-h-screen dark:text-slate-50">
      <div className="max-w-5xl mx-auto py-2">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your organization, billing, and notification preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8 space-y-8">
        <SettingsCard
          title="Organization"
          description="Update your organization's details."
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="org-name" className="block text-sm font-medium">
                Organization Name
              </label>
              <input
                type="text"
                id="org-name"
                defaultValue="KerjaMail Inc."
                className="mt-1 w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </SettingsCard>

        <SettingsCard
          title="Billing & Plan"
          description="Manage your subscription and payment method."
        >
          <div className="space-y-6">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">
                  You are on the <span className="text-blue-600">Pro Plan</span>
                  .
                </p>
                <p className="text-sm text-slate-500">
                  Next renewal on Oct 27, 2025.
                </p>
              </div>
              <button className="px-4 py-2 border rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
                Manage Plan
              </button>
            </div>
            <div className="flex items-center gap-4">
              <CreditCard className="w-8 h-8 text-slate-500" />
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-slate-500">Expires 12/27</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
                Update Payment
              </button>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Notifications"
          description="Choose how you want to be notified."
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Product Updates</p>
                <p className="text-sm text-slate-500">
                  Receive news about new features and updates.
                </p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full p-1 flex items-center">
                <span className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-slate-500">
                  Get notified about important security events.
                </p>
              </div>
              <button className="w-12 h-6 bg-slate-200 dark:bg-slate-600 rounded-full p-1 flex items-center">
                <span className="w-4 h-4 bg-white rounded-full transform translate-x-0 transition-transform"></span>
              </button>
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

export default SettingsPage;
