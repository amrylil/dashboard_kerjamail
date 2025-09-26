import React from "react";
import Modal from "./Modal";
import { CheckCircle, XCircle } from "lucide-react";
import type { Domain } from "../../types/domain";

interface DnsInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: Domain | null;
}

const DnsRecordRow = ({ record }: { record: Domain["dnsRecords"][0] }) => (
  <tr className="border-b dark:border-slate-700">
    <td className="p-3 text-sm">{record.type}</td>
    <td className="p-3 text-sm font-mono break-all">{record.host}</td>
    <td className="p-3 text-sm font-mono break-all">{record.value}</td>
    <td className="p-3 text-sm">
      {record.status === "verified" ? (
        <span className="flex items-center gap-1 text-green-600">
          <CheckCircle size={14} /> Verified
        </span>
      ) : (
        <span className="flex items-center gap-1 text-yellow-600">
          <XCircle size={14} /> Unverified
        </span>
      )}
    </td>
  </tr>
);

const DnsInstructionsModal: React.FC<DnsInstructionsModalProps> = ({
  isOpen,
  onClose,
  domain,
}) => {
  if (!domain) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`DNS Settings for ${domain.domainName}`}
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Please add the following records to your domain's DNS settings. It may
          take up to 24 hours for changes to propagate.
        </p>
        <div className="overflow-x-auto rounded-lg border dark:border-slate-700">
          <table className="min-w-full text-left text-slate-800 dark:text-slate-200">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Host</th>
                <th className="p-3">Value</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {domain.dnsRecords.map((record) => (
                <DnsRecordRow key={record.type} record={record} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DnsInstructionsModal;
