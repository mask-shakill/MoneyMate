import React from "react";
import { PlusCircle, DollarSign, TrendingDown, Wallet } from "lucide-react";

export default function Dashboard({
  transactions,
  onAddIncome,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingBalance = totalIncome - totalExpense;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <DollarSign className="w-8 h-8 text-green-600 mr-2" />
          <div>
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-red-100 p-4 rounded-lg flex items-center">
          <TrendingDown className="w-8 h-8 text-red-600 mr-2" />
          <div>
            <h3 className="text-lg font-semibold">Total Expense</h3>
            <p className="text-2xl font-bold">${totalExpense.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <Wallet className="w-8 h-8 text-blue-600 mr-2" />
          <div>
            <h3 className="text-lg font-semibold">Remaining Balance</h3>
            <p className="text-2xl font-bold">${remainingBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <select
            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {[...Array(5)].map((_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition-colors"
          onClick={onAddIncome}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Transaction
        </button>
      </div>
    </div>
  );
}
