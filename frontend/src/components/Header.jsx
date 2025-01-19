import React from "react";
import { Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <Wallet className="w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold">MoneyMate</h1>
      </div>
    </header>
  );
}
