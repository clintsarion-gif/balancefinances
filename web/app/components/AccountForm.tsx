"use client";

import React, { useState } from "react";

export default function AccountForm({ userId }: any) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        name,
        type,
      }),
    });

    if (res.ok) {
      alert("Account added!");
      setName("");
      setType("");
      window.location.reload(); // refresh UI
    } else {
      alert("Error creating account");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md bg-white shadow-md space-y-4"
    >
      <h3 className="text-xl font-semibold">Add Account</h3>

      {/* Account Name */}
      <div>
        <label className="block text-sm font-medium">Account Name</label>
        <input
          type="text"
          className="mt-1 w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Account Type */}
      <div>
        <label className="block text-sm font-medium">Account Type</label>
        <input
          type="text"
          placeholder="checking, savings, credit card"
          className="mt-1 w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
      >
        Add Account
      </button>
    </form>
  );
}

