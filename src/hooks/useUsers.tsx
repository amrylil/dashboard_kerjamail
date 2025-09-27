import { useState, useMemo, useCallback } from "react";
import type { FilterConfig } from "../components/ui/GenericTable";
import type { User, UserStats } from "../types/users";
import { useToast } from "../context/ToastContext";

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe (You)",
    email: "john.doe@kerjamail.co",
    role: "Owner",
    status: "Active",
    joined: "2023-01-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@kerjamail.co",
    role: "Admin",
    status: "Active",
    joined: "2023-02-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@kerjamail.co",
    role: "Member",
    status: "Active",
    joined: "2023-05-15",
  },
  {
    id: 4,
    name: "Sarah Conner",
    email: "s.conner@kerjamail.co",
    role: "Member",
    status: "Suspended",
    joined: "2023-06-10",
  },
];

export const useUsers = (defaultUsers: User[] = initialUsers) => {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { addToast } = useToast();

  const handleOpenCreateModal = useCallback(() => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((user: User) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setEditingUser(null);
  }, []);

  const handleOpenDeleteModal = useCallback((user: User) => {
    setUserToDelete(user);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setUserToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      addToast(`User '${userToDelete.name}' has been removed.`, "success");
      handleCloseDeleteModal();
    }
  }, [userToDelete, handleCloseDeleteModal, addToast]);

  const handleToggleUserStatus = useCallback(
    (userId: number) => {
      const userToUpdate = users.find((user) => user.id === userId);
      if (!userToUpdate) return;

      const newStatus =
        userToUpdate.status === "Active" ? "Suspended" : "Active";
      addToast(
        `User '${userToUpdate.name}' status changed to ${newStatus}.`,
        "info"
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    },
    [users, addToast]
  );

  const handleSaveUser = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const role = formData.get("role") as User["role"];

      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id ? { ...u, name, email, role } : u
          )
        );
        addToast(`User '${name}' has been updated successfully.`, "success");
      } else {
        const newUser: User = {
          id: Date.now(),
          name,
          email,
          role,
          status: "Active",
          joined: new Date().toISOString().split("T")[0],
        };
        setUsers((prev) => [...prev, newUser]);
        addToast(`User '${name}' has been invited successfully.`, "success");
      }
      handleCloseFormModal();
    },
    [editingUser, handleCloseFormModal, addToast]
  );

  const stats: UserStats = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        if (user.role === "Admin") acc.admins++;
        else if (user.role === "Member") acc.members++;
        if (user.status === "Suspended") acc.suspended++;
        return acc;
      },
      { total: users.length, admins: 0, members: 0, suspended: 0 }
    );
  }, [users]);

  const filterConfig: FilterConfig<User> = {
    role: [
      { label: "Owner", value: "Owner" },
      { label: "Admin", value: "Admin" },
      { label: "Member", value: "Member" },
    ],
    status: [
      { label: "Active", value: "Active" },
      { label: "Suspended", value: "Suspended" },
    ],
  };

  return {
    users,
    isFormModalOpen,
    editingUser,
    userToDelete,
    stats,
    filterConfig,
    actions: {
      openCreateModal: handleOpenCreateModal,
      openEditModal: handleOpenEditModal,
      closeFormModal: handleCloseFormModal,
      saveUser: handleSaveUser,
      openDeleteModal: handleOpenDeleteModal,
      closeDeleteModal: handleCloseDeleteModal,
      confirmDelete: handleConfirmDelete,
      toggleUserStatus: handleToggleUserStatus,
    },
  };
};
