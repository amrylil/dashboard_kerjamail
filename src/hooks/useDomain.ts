import { useState, useMemo, useCallback } from "react";
import type { FilterConfig } from "../components/ui/GenericTable";
import type { DnsRecord, Domain, DomainStats } from "../types/domain";

const generateDnsRecords = (): DnsRecord[] => [
  { type: "MX", host: "@", value: "mx.kerjamail.co", status: "unverified" },
  {
    type: "TXT",
    host: "@",
    value: `v=spf1 include:spf.kerjamail.co ~all`,
    status: "unverified",
  },
  {
    type: "CNAME",
    host: "mail",
    value: "mail.kerjamail.co",
    status: "unverified",
  },
  {
    type: "TXT",
    host: "kerjamail._domainkey",
    value: `v=DKIM1; k=rsa; p=...`,
    status: "unverified",
  },
];

const initialDomains: Domain[] = [
  {
    id: 1,
    domainName: "kerjamail.co",
    status: "Active",
    expiryDate: "2026-08-15",
    activeMailboxes: 15,
    createdAt: "2023-01-10",
    dnsRecords: generateDnsRecords().map((r) => ({ ...r, status: "verified" })),
  },
  {
    id: 2,
    domainName: "example.com",
    status: "Pending DNS",
    expiryDate: "2025-11-20",
    activeMailboxes: 0,
    createdAt: "2023-09-01",
    dnsRecords: generateDnsRecords(),
  },
  {
    id: 3,
    domainName: "suspended-co.com",
    status: "Suspended",
    expiryDate: "2025-10-05",
    activeMailboxes: 5,
    createdAt: "2023-05-12",
    dnsRecords: generateDnsRecords().map((r) => ({ ...r, status: "verified" })),
  },
];

export const useDomains = (defaultDomains: Domain[] = initialDomains) => {
  const [domains, setDomains] = useState<Domain[]>(defaultDomains);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState<Domain | null>(null);
  const [domainForDns, setDomainForDns] = useState<Domain | null>(null);

  const handleOpenCreateModal = useCallback(() => setIsFormModalOpen(true), []);
  const handleCloseFormModal = useCallback(() => setIsFormModalOpen(false), []);
  const handleOpenDeleteModal = useCallback(
    (domain: Domain) => setDomainToDelete(domain),
    []
  );
  const handleCloseDeleteModal = useCallback(() => setDomainToDelete(null), []);
  const handleOpenDnsModal = useCallback(
    (domain: Domain) => setDomainForDns(domain),
    []
  );
  const handleCloseDnsModal = useCallback(() => setDomainForDns(null), []);

  const handleConfirmDelete = useCallback(() => {
    if (domainToDelete) {
      setDomains((prev) => prev.filter((d) => d.id !== domainToDelete.id));
      handleCloseDeleteModal();
    }
  }, [domainToDelete, handleCloseDeleteModal]);

  const handleToggleDomainStatus = useCallback((domainId: number) => {
    setDomains((prev) =>
      prev.map((d) =>
        d.id === domainId
          ? { ...d, status: d.status === "Active" ? "Suspended" : "Active" }
          : d
      )
    );
  }, []);

  const handleVerifyDomain = useCallback((domainId: number) => {
    // Simulasi proses verifikasi
    setTimeout(() => {
      setDomains((prev) =>
        prev.map((d) =>
          d.id === domainId
            ? {
                ...d,
                status: "Active",
                dnsRecords: d.dnsRecords.map((r) => ({
                  ...r,
                  status: "verified",
                })),
              }
            : d
        )
      );
    }, 1500); // Delay 1.5 detik
  }, []);

  const handleSaveDomain = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const domainName = formData.get("domainName") as string;
      const newDomain: Domain = {
        id: Date.now(),
        domainName,
        status: "Pending DNS",
        expiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 tahun dari sekarang
        activeMailboxes: 0,
        createdAt: new Date().toISOString(),
        dnsRecords: generateDnsRecords(),
      };
      setDomains((prev) => [...prev, newDomain]);
      handleCloseFormModal();
      handleOpenDnsModal(newDomain); // Langsung tampilkan instruksi DNS
    },
    [handleCloseFormModal, handleOpenDnsModal]
  );

  const stats: DomainStats = useMemo(() => {
    return domains.reduce(
      (acc, d) => {
        if (d.status === "Active") acc.active++;
        else if (d.status === "Pending DNS") acc.pending++;
        else if (d.status === "Suspended") acc.suspended++;
        return acc;
      },
      { total: domains.length, active: 0, pending: 0, suspended: 0 }
    );
  }, [domains]);

  const filterConfig: FilterConfig<Domain> = {
    status: [
      { label: "Active", value: "Active" },
      { label: "Pending DNS", value: "Pending DNS" },
      { label: "Suspended", value: "Suspended" },
    ],
  };

  return {
    domains,
    isFormModalOpen,
    domainToDelete,
    domainForDns,
    stats,
    filterConfig,
    actions: {
      openCreateModal: handleOpenCreateModal,
      closeFormModal: handleCloseFormModal,
      saveDomain: handleSaveDomain,
      openDeleteModal: handleOpenDeleteModal,
      closeDeleteModal: handleCloseDeleteModal,
      confirmDelete: handleConfirmDelete,
      openDnsModal: handleOpenDnsModal,
      closeDnsModal: handleCloseDnsModal,
      toggleDomainStatus: handleToggleDomainStatus,
      verifyDomain: handleVerifyDomain,
    },
  };
};
