import { useState, useMemo, useCallback } from "react";
import type { FilterConfig } from "../components/ui/GenericTable";
import type { Mailbox, MailboxStats } from "../types/mailboxes";

const initialMailboxes: Mailbox[] = [
  {
    id: 1,
    email: "hello@kerjamail.co",
    domain: "kerjamail.co",
    quotaGB: 5,
    storageUsedGB: 2.1,
    status: "Active",
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    owner: "John Doe",
  },
  {
    id: 2,
    email: "info@example.com",
    domain: "example.com",
    quotaGB: 2,
    storageUsedGB: 1.8,
    status: "Active",
    lastLogin: new Date(Date.now() - 172800000).toISOString(),
    owner: "Jane Smith",
  },
  {
    id: 3,
    email: "support@example.com",
    domain: "example.com",
    quotaGB: 10,
    storageUsedGB: 9.5,
    status: "Suspended",
    lastLogin: new Date(Date.now() - 604800000).toISOString(),
    owner: "Jane Smith",
  },
  {
    id: 4,
    email: "contact@new-project.io",
    domain: "new-project.io",
    quotaGB: "unlimited",
    storageUsedGB: 15.3,
    status: "Active",
    lastLogin: new Date().toISOString(),
    owner: "Mike Johnson",
  },
];

export const useMailboxes = (
  defaultMailboxes: Mailbox[] = initialMailboxes
) => {
  const [mailboxes, setMailboxes] = useState<Mailbox[]>(defaultMailboxes);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMailbox, setEditingMailbox] = useState<Mailbox | null>(null);
  const [mailboxToDelete, setMailboxToDelete] = useState<Mailbox | null>(null);

  const availableDomains = useMemo(
    () => [...new Set(mailboxes.map((m) => m.domain))],
    [mailboxes]
  );

  const handleOpenCreateModal = useCallback(() => {
    setEditingMailbox(null);
    setIsFormModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((mailbox: Mailbox) => {
    setEditingMailbox(mailbox);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => setIsFormModalOpen(false), []);
  const handleOpenDeleteModal = useCallback(
    (mailbox: Mailbox) => setMailboxToDelete(mailbox),
    []
  );
  const handleCloseDeleteModal = useCallback(
    () => setMailboxToDelete(null),
    []
  );

  const handleConfirmDelete = useCallback(() => {
    if (mailboxToDelete) {
      setMailboxes((prev) => prev.filter((m) => m.id !== mailboxToDelete.id));
      handleCloseDeleteModal();
    }
  }, [mailboxToDelete, handleCloseDeleteModal]);

  const handleToggleMailboxStatus = useCallback((mailboxId: number) => {
    setMailboxes((prev) =>
      prev.map((m) =>
        m.id === mailboxId
          ? { ...m, status: m.status === "Active" ? "Suspended" : "Active" }
          : m
      )
    );
  }, []);

  const handleSaveMailbox = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const quota = formData.get("quota") as string;

      if (editingMailbox) {
        setMailboxes((prev) =>
          prev.map((m) =>
            m.id === editingMailbox.id
              ? {
                  ...m,
                  quotaGB: quota === "unlimited" ? "unlimited" : Number(quota),
                }
              : m
          )
        );
      } else {
        const username = formData.get("username") as string;
        const domain = formData.get("domain") as string;
        const newMailbox: Mailbox = {
          id: Date.now(),
          email: `${username}@${domain}`,
          domain,
          quotaGB: quota === "unlimited" ? "unlimited" : Number(quota),
          storageUsedGB: 0,
          status: "Active",
          lastLogin: "Never",
        };
        setMailboxes((prev) => [...prev, newMailbox]);
      }
      handleCloseFormModal();
    },
    [editingMailbox, handleCloseFormModal]
  );

  const stats: MailboxStats = useMemo(() => {
    return mailboxes.reduce(
      (acc, m) => {
        if (m.status === "Active") acc.activeCount++;
        if (m.status === "Suspended") acc.suspendedCount++;
        acc.totalStorageUsedGB += m.storageUsedGB;
        return acc;
      },
      {
        activeCount: 0,
        suspendedCount: 0,
        totalStorageUsedGB: 0,
        totalMailboxes: mailboxes.length,
      }
    );
  }, [mailboxes]);

  const filterConfig: FilterConfig<Mailbox> = {
    domain: availableDomains.map((d) => ({ label: d, value: d })),
    status: [
      { label: "Active", value: "Active" },
      { label: "Suspended", value: "Suspended" },
    ],
  };

  return {
    mailboxes,
    isFormModalOpen,
    editingMailbox,
    mailboxToDelete,
    stats,
    filterConfig,
    availableDomains,
    actions: {
      openCreateModal: handleOpenCreateModal,
      openEditModal: handleOpenEditModal,
      closeFormModal: handleCloseFormModal,
      saveMailbox: handleSaveMailbox,
      openDeleteModal: handleOpenDeleteModal,
      closeDeleteModal: handleCloseDeleteModal,
      confirmDelete: handleConfirmDelete,
      toggleMailboxStatus: handleToggleMailboxStatus,
    },
  };
};
