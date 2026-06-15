import { Transaction } from "@/types/transaction";

export const exportTransactionsToCsv = (transactions: Transaction[]) => {
  const headers = [
    "title",
    "amount",
    "type",
    "category",
    "date",
    "note",
    "account",
  ];

  const rows = transactions.map((transaction) => [
    transaction.title,
    transaction.amount,
    transaction.type,
    transaction.category,
    transaction.date,
    transaction.note || "",
    transaction.account?.name || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "moneyfy-transactions.csv";
  link.click();

  URL.revokeObjectURL(url);
};
