import type { ColumnDef, FilterConfig } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  joined: string;
};

const UsersPage = () => {
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@kerjamail.co",
      role: "Admin",
      joined: "2023-01-10",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@kerjamail.co",
      role: "Editor",
      joined: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@kerjamail.co",
      role: "Viewer",
      joined: "2023-05-15",
    },
  ];

  const columns: ColumnDef<User>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
    { header: "Date Joined", accessorKey: "joined" },
    {
      header: "Actions",
      accessorKey: "id",
      cell: () => (
        <div className="text-right">
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
          >
            Edit
          </a>
          <a href="#" className="text-red-600 hover:text-red-900 font-medium">
            Remove
          </a>
        </div>
      ),
    },
  ];

  const filterConfig: FilterConfig<User> = {
    role: [
      { label: "Admin", value: "Admin" },
      { label: "Editor", value: "Editor" },
      { label: "Viewer", value: "Viewer" },
    ],
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users & Teams</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Invite User
        </button>
      </div>
      <GenericTable<User>
        data={users}
        columns={columns}
        enableSearch
        searchPlaceholder="Search by name or email..."
        enableFilter
        filterConfig={filterConfig}
        showResultCount
      />
    </div>
  );
};

export default UsersPage;
