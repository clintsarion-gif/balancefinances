"use client";

import React, { useState } from "react";

export default function TransactionForm({ userId, accounts }: any) {
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState("");
  const [accountId, setAccountId] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountId,
        date,
        amount: parseFloat(amount),
        merchant,
      }),
    });

    if (res.ok) {
      alert("Transaction added!");
      // Reset fields
      setAmount("");
      setMerchant("");
      setDate("");
      setAccountId("");

      // Refresh the page (Next.js client)
      window.location.reload();
    } else {
      alert("Error creating transaction");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md bg-white shadow-md space-y-4"
    >
      <h3 className="text-xl font-semibold">Add Transaction</h3>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          step="0.01"
          className="mt-1 w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      {/* Merchant */}
      <div>
        <label className="block text-sm font-medium">Merchant</label>
        <input
          type="text"
          className="mt-1 w-full border p-2 rounded"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          className="mt-1 w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Account Selector */}
      <div>
        <label className="block text-sm font-medium">Account</label>
        <select
          className="mt-1 w-full border p-2 rounded"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
        >
          <option value="">Select an account</option>
          {accounts.map((acc: any) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
      >
        Add Transaction
      </button>
    </form>
  );
}

