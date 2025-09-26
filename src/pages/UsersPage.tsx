import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useUsers } from "../hooks/useUsers";

import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";
import { StatCard } from "../components/ui/StatCard";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";

import {
  Users,
  Shield,
  Crown,
  User as UserIcon,
  UserX,
  UserCheck,
  Edit3,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { User } from "../types/users";
import UserForm from "../components/forms/UserForm";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const RoleDisplay = ({ role }: { role: User["role"] }) => {
  const styles = {
    Owner: {
      icon: Crown,
      color:
        "text-amber-800 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/50",
    },
    Admin: {
      icon: Shield,
      color: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
    },
    Member: {
      icon: UserIcon,
      color:
        "text-slate-800 bg-slate-100 dark:text-slate-300 dark:bg-slate-700",
    },
  };
  const { icon: Icon, color } = styles[role];
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      <Icon className="w-4 h-4" />
      {role}
    </span>
  );
};

const StatusDisplay = ({ status }: { status: User["status"] }) => {
  return status === "Active" ? (
    <span className="inline-flex items-center gap-2 text-green-700 dark:text-green-400">
      <CheckCircle className="w-4 h-4" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 text-red-700 dark:text-red-500">
      <XCircle className="w-4 h-4" /> Suspended
    </span>
  );
};

const UsersPage = () => {
  const {
    users,
    isFormModalOpen,
    editingUser,
    userToDelete,
    stats,
    filterConfig,
    actions,
  } = useUsers();

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-slate-700 flex items-center justify-center font-bold text-purple-600 dark:text-purple-400">
              {getInitials(row.original.name)}
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">
                {row.original.name}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {row.original.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Role",
        accessorKey: "role",
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "arrIncludesSome",
        cell: ({ row }) => <RoleDisplay role={row.original.role} />,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: "arrIncludesSome",
        cell: ({ row }) => <StatusDisplay status={row.original.status} />,
      },
      {
        header: "Date Joined",
        accessorKey: "joined",
        enableSorting: true,
        cell: ({ row }) => formatDate(row.original.joined),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => actions.toggleUserStatus(row.original.id)}
              className="p-2 text-slate-600 hover:text-yellow-600"
              title={
                row.original.status === "Active"
                  ? "Suspend User"
                  : "Unsuspend User"
              }
            >
              {row.original.status === "Active" ? (
                <UserX className="w-4 h-4" />
              ) : (
                <UserCheck className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => actions.openEditModal(row.original)}
              className="p-2 text-slate-600 hover:text-blue-600"
              title="Edit User"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => actions.openDeleteModal(row.original)}
              className="p-2 text-slate-600 hover:text-red-600"
              title="Remove User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [actions]
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                User Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Invite and manage team members and their roles
              </p>
            </div>
          </div>
          <button
            onClick={actions.openCreateModal}
            className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-800 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Invite User
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Users"
            value={stats.total}
            color="purple"
            icon={<Users className="w-6 h-6 text-purple-600" />}
          />
          <StatCard
            label="Administrators"
            value={stats.admins}
            color="red"
            icon={<Shield className="w-6 h-6 text-red-600" />}
          />
          <StatCard
            label="Members"
            value={stats.members}
            color="blue"
            icon={<UserIcon className="w-6 h-6 text-blue-600" />}
          />
          <StatCard
            label="Suspended"
            value={stats.suspended}
            color="green"
            icon={<UserX className="w-6 h-6 text-green-600" />}
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <GenericTable
            data={users}
            columns={columns}
            enableSearch
            searchPlaceholder="Search by name or email..."
            enableFilter
            filterConfig={filterConfig}
            showResultCount
            enablePagination
          />
        </div>
      </div>
      <Modal
        isOpen={isFormModalOpen}
        onClose={actions.closeFormModal}
        title={editingUser ? "Edit User" : "Invite New User"}
      >
        <UserForm
          onSubmit={actions.saveUser}
          onCancel={actions.closeFormModal}
          initialData={editingUser}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={!!userToDelete}
        onCancel={actions.closeDeleteModal}
        onConfirm={actions.confirmDelete}
        itemName={userToDelete?.name || ""}
      />
    </div>
  );
};

export default UsersPage;
