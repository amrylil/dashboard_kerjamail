import React, { useState } from "react";
import type { ColumnDef, FilterConfig } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";
import { Plus, Globe, CheckCircle, Clock, Edit3, Trash2 } from "lucide-react";

type Domain = {
  id: number;
  name: string;
  status: "Verified" | "Pending";
  added: string;
};

const DomainsPage = () => {
  const [domains, setDomains] = useState<Domain[]>([
    { id: 1, name: "kerjamail.co", status: "Verified", added: "2023-01-15" },
    { id: 2, name: "example.com", status: "Verified", added: "2023-03-22" },
    { id: 3, name: "new-project.io", status: "Pending", added: "2023-09-10" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);

  const handleOpenCreateModal = () => {
    setEditingDomain(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (domain: Domain) => {
    setEditingDomain(domain);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDomain(null);
  };

  const handleDeleteDomain = (id: number) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      setDomains(domains.filter((d) => d.id !== id));
    }
  };

  const handleSaveDomain = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const domainName = formData.get("name") as string;

    if (editingDomain) {
      setDomains(
        domains.map((d) =>
          d.id === editingDomain.id ? { ...d, name: domainName } : d
        )
      );
    } else {
      const newDomain: Domain = {
        id: Date.now(),
        name: domainName,
        status: "Pending",
        added: new Date().toISOString().split("T")[0],
      };
      setDomains([...domains, newDomain]);
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

  const columns: ColumnDef<Domain>[] = [
    {
      header: "Domain Name",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Globe className="w-4 h-4 text-slate-600" />
          </div>
          <span className="font-medium text-slate-900">{row.name}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Verified"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status === "Verified" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Clock className="w-4 h-4" />
          )}
          {row.status}
        </span>
      ),
    },
    {
      header: "Date Added",
      accessorKey: "added",
      cell: (row) => (
        <span className="text-slate-600">{formatDate(row.added)}</span>
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
            title="Edit domain"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteDomain(row.id)}
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete domain"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filterConfig: FilterConfig<Domain> = {
    status: [
      { label: "Verified", value: "Verified" },
      { label: "Pending", value: "Pending" },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Domain Management
                </h1>
                <p className="text-slate-600 mt-1">
                  Manage and monitor your domains
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Domain
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Verified Domains
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {domains.filter((d) => d.status === "Verified").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Pending Verification
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {domains.filter((d) => d.status === "Pending").length}
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
                  Total Domains
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {domains.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <GenericTable<Domain>
              data={domains}
              columns={columns}
              enableSearch={true}
              searchPlaceholder="Search domains..."
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
        title={editingDomain ? "Edit Domain" : "Add New Domain"}
      >
        <form onSubmit={handleSaveDomain} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Domain Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={editingDomain?.name || ""}
              placeholder="e.g., example.com"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
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
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Save Domain
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DomainsPage;
