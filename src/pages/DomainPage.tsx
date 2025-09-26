import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import GenericTable from "../components/ui/GenericTable";
import { StatCard } from "../components/ui/StatCard";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal";
import DnsInstructionsModal from "../components/ui/DnsInstructionsModal";

import {
  Globe,
  CheckCircle,
  Clock,
  PauseCircle,
  Plus,
  Trash2,
  Settings,
  CloudCheck,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import type { Domain } from "../types/domain";
import DomainForm from "../components/forms/DomainForm";
import Modal from "../components/ui/Modal";
import { useDomains } from "../hooks/useDomain";

const formatDate = (isoString: string) =>
  new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const StatusDisplay = ({ status }: { status: Domain["status"] }) => {
  const styles = {
    Active: { icon: CheckCircle, color: "text-green-800 bg-green-100" },
    "Pending DNS": { icon: Clock, color: "text-yellow-800 bg-yellow-100" },
    Suspended: { icon: PauseCircle, color: "text-red-800 bg-red-100" },
  };
  const { icon: Icon, color } = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      <Icon className="w-4 h-4" />
      {status}
    </span>
  );
};

const DomainsPage = () => {
  const {
    domains,
    isFormModalOpen,
    domainToDelete,
    domainForDns,
    stats,
    filterConfig,
    actions,
  } = useDomains();

  const columns = useMemo<ColumnDef<Domain>[]>(
    () => [
      {
        header: "Domain",
        accessorKey: "domainName",
        enableSorting: true,
        cell: ({ row }) => (
          <div>
            <div className="font-bold text-slate-900 dark:text-slate-100">
              {row.original.domainName}
            </div>
            <div className="text-xs text-slate-500">
              Expires on {formatDate(row.original.expiryDate)}
            </div>
          </div>
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
        header: "Active Mailboxes",
        accessorKey: "activeMailboxes",
        enableSorting: true,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        enableSorting: true,
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            {row.original.status === "Pending DNS" && (
              <button
                onClick={() => actions.verifyDomain(row.original.id)}
                className="p-2 text-slate-600 hover:text-green-600"
                title="Verify DNS"
              >
                <CloudCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => actions.openDnsModal(row.original)}
              className="p-2 text-slate-600 hover:text-blue-600"
              title="Manage DNS"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => actions.toggleDomainStatus(row.original.id)}
              className="p-2 text-slate-600 hover:text-yellow-600"
              title={
                row.original.status === "Suspended" ? "Activate" : "Suspend"
              }
            >
              {row.original.status === "Suspended" ? (
                <ToggleRight className="w-4 h-4" />
              ) : (
                <ToggleLeft className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => actions.openDeleteModal(row.original)}
              className="p-2 text-slate-600 hover:text-red-600"
              title="Delete Domain"
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
            <div className="p-3 bg-purple-100 dark:bg-slate-700 rounded-xl">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Domains Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Add and verify domains for your organization
              </p>
            </div>
          </div>
          <button
            onClick={actions.openCreateModal}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Domain
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Domains"
            value={stats.total}
            color="purple"
            icon={<Globe />}
          />
          <StatCard
            label="Active"
            value={stats.active}
            color="green"
            icon={<CheckCircle />}
          />
          <StatCard
            label="Pending DNS"
            value={stats.pending}
            color="blue"
            icon={<Clock />}
          />
          <StatCard
            label="Suspended"
            value={stats.suspended}
            color="red"
            icon={<PauseCircle />}
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
          <GenericTable
            data={domains}
            columns={columns}
            enableSearch
            searchPlaceholder="Search domains..."
            enableFilter
            filterConfig={filterConfig}
            showResultCount
            enablePagination
          />
        </div>
      </div>

      <DnsInstructionsModal
        isOpen={!!domainForDns}
        onClose={actions.closeDnsModal}
        domain={domainForDns}
      />
      <ConfirmDeleteModal
        isOpen={!!domainToDelete}
        onCancel={actions.closeDeleteModal}
        onConfirm={actions.confirmDelete}
        itemName={domainToDelete?.domainName || ""}
      />
      <Modal
        isOpen={isFormModalOpen}
        onClose={actions.closeFormModal}
        title="Add New Domain"
      >
        <DomainForm
          onSubmit={actions.saveDomain}
          onCancel={actions.closeFormModal}
        />
      </Modal>
    </div>
  );
};

export default DomainsPage;
