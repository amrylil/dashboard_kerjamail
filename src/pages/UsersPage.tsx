import React, { useState } from "react";
import Modal from "../components/ui/Modal";
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
  const [users, setUsers] = useState<User[]>([
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
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user_name = formData.get("name") as string;
    const user_email = formData.get("email") as string;
    const user_role = formData.get("role") as "Admin" | "Editor" | "Viewer";

    if (editingUser) {
      // Logic untuk update user
      console.log("Updating user:", {
        ...editingUser,
        name: user_name,
        email: user_email,
        role: user_role,
      });
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...editingUser,
                name: user_name,
                email: user_email,
                role: user_role,
              }
            : u
        )
      );
    } else {
      // Logic untuk create user baru
      const newUser = {
        id: Date.now(),
        name: user_name,
        email: user_email,
        role: user_role,
        joined: new Date().toISOString().split("T")[0],
      };
      console.log("Creating new user:", newUser);
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const columns: ColumnDef<User>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
    { header: "Date Joined", accessorKey: "joined" },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="text-right">
          <button
            onClick={() => handleOpenEditModal(row)}
            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
          >
            Edit
          </button>
          <button className="text-red-600 hover:text-red-900 font-medium">
            Remove
          </button>
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
        <button
          onClick={handleOpenCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? "Edit User" : "Invite New User"}
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={editingUser?.name || ""}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={editingUser?.email || ""}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              defaultValue={editingUser?.role || "Viewer"}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
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
              Save User
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersPage;
