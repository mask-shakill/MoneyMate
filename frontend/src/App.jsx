import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AddIncomeModal from "./components/AddIncomeModal";
import TransactionHistory from "./components/TransactionHistory";
import dummyData from "./data/dummyData.json";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    setTransactions(dummyData.transactions);
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      (!selectedMonth ||
        transactionDate.getMonth() + 1 === parseInt(selectedMonth)) &&
      (!selectedYear ||
        transactionDate.getFullYear() === parseInt(selectedYear))
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard
          transactions={filteredTransactions}
          onAddIncome={() => setIsModalOpen(true)}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <TransactionHistory transactions={filteredTransactions} />
        {isModalOpen && (
          <AddIncomeModal
            onClose={() => setIsModalOpen(false)}
            onAddTransaction={addTransaction}
          />
        )}
      </main>
    </div>
  );
}
