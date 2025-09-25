import type { ColumnDef, FilterConfig } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";

type Mailbox = {
  id: number;
  email: string;
  domain: string;
  created: string;
  status: "Active" | "Inactive";
};

const MailboxesPage = () => {
  const mailboxes: Mailbox[] = [
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
  ];

  const columns: ColumnDef<Mailbox>[] = [
    { header: "Email Address", accessorKey: "email" },
    { header: "Domain", accessorKey: "domain" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Date Created", accessorKey: "created" },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="text-right">
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
          >
            Settings
          </a>
          <a href="#" className="text-red-600 hover:text-red-900 font-medium">
            Delete
          </a>
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mailboxes</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Create Mailbox
        </button>
      </div>
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
  );
};

export default MailboxesPage;
