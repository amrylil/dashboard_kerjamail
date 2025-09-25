import React, { useState } from "react";
import type { ColumnDef, FilterConfig } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";
import {
  Plus,
  Mail,
  CheckCircle,
  XCircle,
  Edit3,
  Trash2,
  AtSign,
  Globe,
} from "lucide-react";

type Mailbox = {
  id: number;
  email: string;
  domain: string;
  created: string;
  status: "Active" | "Inactive";
};

const MailboxesPage = () => {
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([
    {
      id: 1,
      email: "hello@kerjamail.co",
      domain: "kerjamail.co",
      created: "2023-01-15",
      status: "Active",
    },
    {
      id: 2,
      email: "info@example.com",
      domain: "example.com",
      created: "2023-03-22",
      status: "Active",
    },
    {
      id: 3,
      email: "support@example.com",
      domain: "example.com",
      created: "2023-04-01",
      status: "Inactive",
    },
    {
      id: 4,
      email: "contact@new-project.io",
      domain: "new-project.io",
      created: "2023-09-10",
      status: "Active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMailbox, setEditingMailbox] = useState<Mailbox | null>(null);

  const handleOpenCreateModal = () => {
    setEditingMailbox(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (mailbox: Mailbox) => {
    setEditingMailbox(mailbox);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMailbox(null);
  };

  const handleDeleteMailbox = (id: number) => {
    if (window.confirm("Are you sure you want to delete this mailbox?")) {
      setMailboxes(mailboxes.filter((m) => m.id !== id));
    }
  };

  const handleSaveMailbox = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mailboxEmail = formData.get("email") as string;
    const mailboxStatus = formData.get("status") as "Active" | "Inactive";

    if (editingMailbox) {
      setMailboxes(
        mailboxes.map((m) =>
          m.id === editingMailbox.id
            ? {
                ...m,
                email: mailboxEmail,
                status: mailboxStatus,
                domain: mailboxEmail.split("@")[1] || "N/A",
              }
            : m
        )
      );
    } else {
      const newMailbox: Mailbox = {
        id: Date.now(),
        email: mailboxEmail,
        domain: mailboxEmail.split("@")[1] || "N/A",
        status: mailboxStatus,
        created: new Date().toISOString().split("T")[0],
      };
      setMailboxes([...mailboxes, newMailbox]);
    }
    handleCloseModal();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: ColumnDef<Mailbox>[] = [
    {
      header: "Email Address",
      accessorKey: "email",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium text-slate-900">{row.email}</span>
        </div>
      ),
    },
    {
      header: "Domain",
      accessorKey: "domain",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600">{row.domain}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status === "Active" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          {row.status}
        </span>
      ),
    },
    {
      header: "Date Created",
      accessorKey: "created",
      cell: (row) => (
        <span className="text-slate-600">{formatDate(row.created)}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleOpenEditModal(row)}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit mailbox"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteMailbox(row.id)}
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete mailbox"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filterConfig: FilterConfig<Mailbox> = {
    status: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
    domain: [
      { label: "kerjamail.co", value: "kerjamail.co" },
      { label: "example.com", value: "example.com" },
      { label: "new-project.io", value: "new-project.io" },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Mailbox Management
                </h1>
                <p className="text-slate-600 mt-1">
                  Manage email addresses and mailboxes
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Create Mailbox
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Active Mailboxes
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {mailboxes.filter((m) => m.status === "Active").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Inactive Mailboxes
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {mailboxes.filter((m) => m.status === "Inactive").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Unique Domains
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(mailboxes.map((m) => m.domain)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Mailboxes
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {mailboxes.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <GenericTable<Mailbox>
              data={mailboxes}
              columns={columns}
              enableSearch={true}
              searchPlaceholder="Search by email or domain..."
              enableFilter={true}
              filterConfig={filterConfig}
              showResultCount={true}
            />
          </div>
        </div>
      </div>

      {/* Modal using your component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingMailbox ? "Edit Mailbox" : "Create New Mailbox"}
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={editingMailbox?.email || ""}
                placeholder="e.g., hello@example.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={editingMailbox?.status || "Active"}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const emailInput = document.getElementById(
                  "email"
                ) as HTMLInputElement;
                const statusSelect = document.getElementById(
                  "status"
                ) as HTMLSelectElement;

                if (emailInput && statusSelect && emailInput.value.trim()) {
                  const mailboxEmail = emailInput.value.trim();
                  const mailboxStatus = statusSelect.value as
                    | "Active"
                    | "Inactive";

                  if (editingMailbox) {
                    setMailboxes(
                      mailboxes.map((m) =>
                        m.id === editingMailbox.id
                          ? {
                              ...m,
                              email: mailboxEmail,
                              status: mailboxStatus,
                              domain: mailboxEmail.split("@")[1] || "N/A",
                            }
                          : m
                      )
                    );
                  } else {
                    const newMailbox: Mailbox = {
                      id: Date.now(),
                      email: mailboxEmail,
                      domain: mailboxEmail.split("@")[1] || "N/A",
                      status: mailboxStatus,
                      created: new Date().toISOString().split("T")[0],
                    };
                    setMailboxes([...mailboxes, newMailbox]);
                  }
                  handleCloseModal();
                }
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
            >
              Save Mailbox
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MailboxesPage;
