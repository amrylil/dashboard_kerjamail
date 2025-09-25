import React from "react";
import type { ColumnDef, FilterConfig } from "../components/ui/GenericTable";
import GenericTable from "../components/ui/GenericTable";

type Domain = {
  id: number;
  name: string;
  status: "Verified" | "Pending";
  added: string;
};

const DomainsPage = () => {
  const domains: Domain[] = [
    { id: 1, name: "kerjamail.co", status: "Verified", added: "2023-01-15" },
    { id: 2, name: "example.com", status: "Verified", added: "2023-03-22" },
    { id: 3, name: "new-project.io", status: "Pending", added: "2023-09-10" },
  ];

  const columns: ColumnDef<Domain>[] = [
    {
      header: "Domain Name",
      accessorKey: "name",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "Verified"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Date Added",
      accessorKey: "added",
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="text-right">
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
          >
            Verify
          </a>
          <a href="#" className="text-red-600 hover:text-red-900 font-medium">
            Delete
          </a>
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
    <div className="  min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Domains</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Add New Domain
        </button>
      </div>
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
  );
};

export default DomainsPage;
