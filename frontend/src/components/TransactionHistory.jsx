import React from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function TransactionHistory({ transactions }) {
  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getFullYear() !== dateB.getFullYear()) {
      return dateB.getFullYear() - dateA.getFullYear();
    }
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-2 px-4 flex items-center">
                  {transaction.type === "income" ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  {transaction.type}
                </td>
                <td className="py-2 px-4">${transaction.amount.toFixed(2)}</td>
                <td className="py-2 px-4">{transaction.category}</td>
                <td className="py-2 px-4">
                  {new Date(transaction.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
