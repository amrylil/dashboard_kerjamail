import React from "react";
import { Camera } from "lucide-react";

const ProfileCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
      {title}
    </h3>
    {children}
  </div>
);

const ProfilePage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto py-2">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              My Profile
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Update your photo, personal details, and password.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8 space-y-8">
        <ProfileCard title="Personal Information">
          <form className="space-y-6 dark:text-slate-50">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="https://placehold.co/96x96/E9D5FF/7C3AED?text=JD"
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-full"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1">
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
                  defaultValue="John Doe"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl"
                />
              </div>
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
                defaultValue="john.doe@kerjamail.co"
                disabled
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </ProfileCard>

        <ProfileCard title="Change Password">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </form>
        </ProfileCard>
      </div>
    </div>
  );
};

export default ProfilePage;
