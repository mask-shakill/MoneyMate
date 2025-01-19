import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function TransactionHistory({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const openModal = (transaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionToEdit(null);
  };

  const handleUpdateTransaction = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      ...transactionToEdit,
      amount: parseFloat(e.target.amount.value),
      category: e.target.category.value,
    };
    onEditTransaction(updatedTransaction);
    closeModal();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-900">
                  {transaction.type}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {transaction.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openModal(transaction)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      aria-label="Edit transaction"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteTransaction(transaction._id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Delete transaction"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
            <form onSubmit={handleUpdateTransaction}>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-2"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  defaultValue={transactionToEdit.amount}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-2"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={transactionToEdit.category}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
