"use client";

import { useState } from "react";

interface TransactionImportFormProps {
  onImportTransactions: (file: File) => Promise<void>;
}

const TransactionImportForm = ({
  onImportTransactions,
}: TransactionImportFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a CSV file first.");
      return;
    }

    setImporting(true);
    setMessage("");

    try {
      await onImportTransactions(selectedFile);
      setSelectedFile(null);
      setMessage("Transactions imported successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Unable to import transactions.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">Import Transactions</h2>
      <p className="mt-1 text-sm text-slate-400">
        Upload a CSV with title, amount, type, category, date, and note columns
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={(event) =>
            setSelectedFile(event.target.files?.[0] || null)
          }
          className="block w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-sm"
        />

        <button
          type="submit"
          disabled={importing}
          className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
        >
          {importing ? "Importing..." : "Import CSV"}
        </button>

        {message && <p className="text-sm text-slate-400">{message}</p>}
      </form>
    </section>
  );
};

export default TransactionImportForm;