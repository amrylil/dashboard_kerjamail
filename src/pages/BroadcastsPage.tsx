import type { ColumnDef, FilterConfig } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";

type Broadcast = {
  id: number;
  name: string;
  status: "Sent" | "Draft" | "Scheduled";
  recipients: number;
  sentDate: string;
};

const BroadcastsPage = () => {
  const broadcasts: Broadcast[] = [
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
  ];

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
      cell: () => (
        <div className="text-right">
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
          >
            View Stats
          </a>
          <a
            href="#"
            className="text-yellow-600 hover:text-yellow-900 mr-4 font-medium"
          >
            Edit
          </a>
          <a href="#" className="text-red-600 hover:text-red-900 font-medium">
            Delete
          </a>
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
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
    </div>
  );
};

export default BroadcastsPage;
