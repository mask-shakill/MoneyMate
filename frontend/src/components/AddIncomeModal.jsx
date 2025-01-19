import React, { useState } from "react";
import { X } from "lucide-react";

export default function AddIncomeModal({ onClose, onAddTransaction }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  //const [date, setDate] = useState(''); //removed

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({ type, amount: parseFloat(amount), category });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Transaction</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Type</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Amount</label>
            <input
              type="number"
              className="w-full border rounded-md px-3 py-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          {/*Removed Date Input Field*/}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
