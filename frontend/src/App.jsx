// App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AddIncomeModal from "./components/AddIncomeModal";
import TransactionHistory from "./components/TransactionHistory";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Fetch transactions from API when component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://money-mate-xi.vercel.app/api/transactions"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data); // Set transactions data from API
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Add transaction via API
  const addTransaction = async (newTransaction) => {
    const now = new Date();
    const transactionWithDate = {
      ...newTransaction,
      date: now.toISOString(), // Store full ISO string for accurate sorting
    };

    try {
      const response = await fetch(
        "https://money-mate-xi.vercel.app/api/transactions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionWithDate),
        }
      );

      if (response.ok) {
        const newTransactionData = await response.json();
        setTransactions([...transactions, newTransactionData]); // Update transactions with the new one
      } else {
        console.error("Error adding transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle Edit
  const editTransaction = async (transaction) => {
    const updatedTransaction = {
      ...transaction,
      amount: transaction.amount + 10, // Example update
    };

    try {
      const response = await fetch(
        `https://money-mate-xi.vercel.app/api/transactions/${transaction._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTransaction),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setTransactions((prevTransactions) =>
          prevTransactions.map((t) =>
            t._id === updatedData._id ? updatedData : t
          )
        );
      } else {
        console.error("Error editing transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle Delete
  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(
        `https://money-mate-xi.vercel.app/api/transactions/${transactionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setTransactions(transactions.filter((t) => t._id !== transactionId)); // Remove from state
      } else {
        console.error("Error deleting transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Filter transactions based on selected month and year
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
        <TransactionHistory
          transactions={filteredTransactions}
          onEditTransaction={editTransaction}
          onDeleteTransaction={deleteTransaction}
        />
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
