import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useMailboxes } from "../hooks/useMailboxes";

import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";
import { StatCard } from "../components/ui/StatCard";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";

import {
  Mail,
  HardDrive,
  CheckCircle,
  XCircle,
  Edit3,
  Trash2,
  Plus,
  KeyRound,
  UserCheck,
  UserX,
} from "lucide-react";
import MailboxForm from "../components/forms/MailboxForm";
import type { Mailbox } from "../types/mailboxes";
import { FormatDate } from "../utils/formatdate";

const StorageBar = ({
  used,
  quota,
}: {
  used: number;
  quota: number | "unlimited";
}) => {
  if (quota === "unlimited") {
    return <span className="font-medium">{used.toFixed(1)} GB / ∞</span>;
  }
  const percentage = (used / quota) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {used.toFixed(1)} GB / {quota} GB
        </span>
        <span className="text-slate-500">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1">
        <div
          className={`h-2 rounded-full ${
            percentage > 90 ? "bg-red-500" : "bg-blue-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const StatusDisplay = ({ status }: { status: Mailbox["status"] }) =>
  status === "Active" ? (
    <span className="inline-flex items-center gap-2 text-green-700 dark:text-green-400">
      <CheckCircle className="w-4 h-4" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 text-red-700 dark:text-red-500">
      <XCircle className="w-4 h-4" /> Suspended
    </span>
  );

const MailboxesPage = () => {
  const {
    mailboxes,
    isFormModalOpen,
    editingMailbox,
    mailboxToDelete,
    stats,
    filterConfig,
    availableDomains,
    actions,
  } = useMailboxes();

  const columns = useMemo<ColumnDef<Mailbox>[]>(
    () => [
      {
        header: "Email Address",
        accessorKey: "email",
        enableSorting: true,
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {row.original.email}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Owner: {row.original.owner || "N/A"}
            </div>
          </div>
        ),
      },
      {
        header: "Storage Used",
        accessorKey: "storageUsedGB",
        enableSorting: true,
        cell: ({ row }) => (
          <StorageBar
            used={row.original.storageUsedGB}
            quota={row.original.quotaGB}
          />
        ),
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
        header: "Last Login",
        accessorKey: "lastLogin",
        enableSorting: true,
        cell: ({ row }) => FormatDate(row.original.lastLogin),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <button
              className="p-2 text-slate-600 hover:text-green-600"
              title="Reset Password"
            >
              <KeyRound className="w-4 h-4" />
            </button>
            <button
              onClick={() => actions.toggleMailboxStatus(row.original.id)}
              className="p-2 text-slate-600 hover:text-yellow-600"
              title={
                row.original.status === "Active"
                  ? "Suspend Mailbox"
                  : "Unsuspend"
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
              title="Edit Mailbox"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => actions.openDeleteModal(row.original)}
              className="p-2 text-slate-600 hover:text-red-600"
              title="Delete Mailbox"
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
                Mailbox Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Manage email accounts and their resources
              </p>
            </div>
          </div>
          <button
            onClick={actions.openCreateModal}
            className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            New Mailbox
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Mailboxes"
            value={stats.totalMailboxes}
            color="purple"
            icon={<Mail className="text-purple-600" />}
          />
          <StatCard
            label="Active"
            value={stats.activeCount}
            color="green"
            icon={<CheckCircle className="text-green-600" />}
          />
          <StatCard
            label="Suspended"
            value={stats.suspendedCount}
            color="red"
            icon={<XCircle className="text-red-600" />}
          />
          <StatCard
            label="Total Storage Used"
            value={Math.round(stats.totalStorageUsedGB)}
            color="blue"
            icon={<HardDrive className="text-blue-600" />}
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <GenericTable
            data={mailboxes}
            columns={columns}
            enableSearch
            searchPlaceholder="Search by email..."
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
        title={editingMailbox ? "Edit Mailbox" : "Create New Mailbox"}
      >
        <MailboxForm
          onSubmit={actions.saveMailbox}
          onCancel={actions.closeFormModal}
          initialData={editingMailbox}
          availableDomains={availableDomains}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={!!mailboxToDelete}
        onCancel={actions.closeDeleteModal}
        onConfirm={actions.confirmDelete}
        itemName={mailboxToDelete?.email || ""}
      />
    </div>
  );
};

export default MailboxesPage;
