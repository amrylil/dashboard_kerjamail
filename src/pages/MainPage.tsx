import { useMailboxes } from "../hooks/useMailboxes";
import { useUsers } from "../hooks/useUsers";

import Modal from "../components/ui/Modal";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";
import { useDomains } from "../hooks/useDomain";
import UserForm from "../components/forms/UserForm";
import { StatCard } from "../components/ui/dashboard/StatCard";
import { ProjectAnalytics } from "../components/ui/dashboard/ProjectAnalytics";
import { TopStorageUsers } from "../components/ui/dashboard/TopStorageUsers";
import { UserRolePieChart } from "../components/ui/dashboard/UserRolePieChart";
import { MailboxActivityChart } from "../components/ui/dashboard/MailboxActivityChart";
import { PlusIcon } from "lucide-react";

const DashboardPage = () => {
  const { stats: domainStats } = useDomains();
  const { mailboxes, stats: mailboxStats } = useMailboxes();
  const {
    stats: userStats,
    actions: userActions,
    isFormModalOpen,
    editingUser,
    userToDelete,
  } = useUsers();

  return (
    <div className="min-h-screen ">
      <header>
        {" "}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={userActions.openCreateModal}
              className="flex items-center justify-center bg-blue-700 dark:bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-blue-800 dark:hover:bg-blue-500 transition"
            >
              <PlusIcon />
              Invite User
            </button>
            <button className="bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-semibold shadow-sm border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
              Import Data
            </button>
          </div>
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Domains"
            value={domainStats.total.toString()}
            change="+2 this month"
            isPrimary={true}
          />
          <StatCard
            title="Active Mailboxes"
            value={mailboxStats.totalMailboxes.toString()}
            change="+5 this month"
          />
          <StatCard
            title="Total Users"
            value={userStats.total.toString()}
            change="+1 this month"
          />
          <StatCard
            title="Pending Verifications"
            value={domainStats.pending.toString()}
            change="Action required"
          />
        </div>

        <ProjectAnalytics />
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm dark:border dark:border-slate-700 col-span-1 lg:col-span-2">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100">
            Reminders
          </h3>
          <div className="mt-4 bg-blue-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 dark:text-slate-100">
              Meeting with Marketing Team
            </p>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Time: 02:00 PM - 04:00 PM
            </p>
            <button className="w-full mt-3 bg-blue-700 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-500">
              Start Meeting
            </button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <TopStorageUsers mailboxes={mailboxes} />
          <UserRolePieChart stats={userStats} />
          <MailboxActivityChart />
        </div>
      </main>

      <Modal
        isOpen={isFormModalOpen}
        onClose={userActions.closeFormModal}
        title={editingUser ? "Edit User" : "Invite New User"}
      >
        <UserForm
          onSubmit={userActions.saveUser}
          onCancel={userActions.closeFormModal}
          initialData={editingUser}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={!!userToDelete}
        onCancel={userActions.closeDeleteModal}
        onConfirm={userActions.confirmDelete}
        itemName={userToDelete?.name || ""}
      />
    </div>
  );
};

export default DashboardPage;
