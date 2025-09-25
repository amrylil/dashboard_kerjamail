import React, { useState } from "react";
import type { ColumnDef, FilterConfig } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";
import Modal from "../components/ui/Modal";

type Broadcast = {
  id: number;
  name: string;
  status: "Sent" | "Draft" | "Scheduled";
  recipients: number;
  sentDate: string;
};

const BroadcastsPage = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([
    {
      id: 1,
      name: "Weekly Newsletter - Sep Week 4",
      status: "Sent",
      recipients: 1450,
      sentDate: "2025-09-25",
    },
    {
      id: 2,
      name: "Product Update: New Features",
      status: "Sent",
      recipients: 830,
      sentDate: "2025-09-23",
    },
    {
      id: 3,
      name: "Monthly Promo October",
      status: "Draft",
      recipients: 0,
      sentDate: "-",
    },
    {
      id: 4,
      name: "Internal Team Announcement",
      status: "Scheduled",
      recipients: 58,
      sentDate: "2025-09-28",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBroadcast, setEditingBroadcast] = useState<Broadcast | null>(
    null
  );

  const handleOpenCreateModal = () => {
    setEditingBroadcast(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (broadcast: Broadcast) => {
    setEditingBroadcast(broadcast);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBroadcast(null);
  };

  const handleSaveBroadcast = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const campaignName = formData.get("name") as string;
    const campaignStatus = formData.get("status") as
      | "Sent"
      | "Draft"
      | "Scheduled";

    if (editingBroadcast) {
      setBroadcasts(
        broadcasts.map((b) =>
          b.id === editingBroadcast.id
            ? { ...b, name: campaignName, status: campaignStatus }
            : b
        )
      );
    } else {
      const newBroadcast: Broadcast = {
        id: Date.now(),
        name: campaignName,
        status: campaignStatus,
        recipients: 0,
        sentDate:
          campaignStatus === "Sent"
            ? new Date().toISOString().split("T")[0]
            : "-",
      };
      setBroadcasts([...broadcasts, newBroadcast]);
    }
    handleCloseModal();
  };

  const columns: ColumnDef<Broadcast>[] = [
    { header: "Campaign Name", accessorKey: "name" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "Sent"
              ? "bg-green-100 text-green-800"
              : row.status === "Draft"
              ? "bg-gray-100 text-gray-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Recipients",
      accessorKey: "recipients",
      cell: (row) => row.recipients.toLocaleString(),
    },
    { header: "Date", accessorKey: "sentDate" },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="text-right">
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
          >
            View Stats
          </a>
          <button
            onClick={() => handleOpenEditModal(row)}
            className="text-yellow-600 hover:text-yellow-900 mr-4 font-medium"
          >
            Edit
          </button>
          <button className="text-red-600 hover:text-red-900 font-medium">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filterConfig: FilterConfig<Broadcast> = {
    status: [
      { label: "Sent", value: "Sent" },
      { label: "Draft", value: "Draft" },
      { label: "Scheduled", value: "Scheduled" },
    ],
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Broadcasts</h1>
        <button
          onClick={handleOpenCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          New Broadcast
        </button>
      </div>
      <GenericTable<Broadcast>
        data={broadcasts}
        columns={columns}
        enableSearch={true}
        searchPlaceholder="Search campaigns..."
        enableFilter={true}
        filterConfig={filterConfig}
        showResultCount={true}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBroadcast ? "Edit Broadcast" : "Create New Broadcast"}
      >
        <form onSubmit={handleSaveBroadcast} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={editingBroadcast?.name || ""}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={editingBroadcast?.status || "Draft"}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Sent</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Save Broadcast
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BroadcastsPage;
