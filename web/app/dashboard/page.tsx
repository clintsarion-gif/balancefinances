import React from "react";
import TransactionForm from "../components/TransactionForm";
import AccountForm from "../components/AccountForm";

export default async function DashboardPage() {
  // Replace with YOUR real userId
  const userId = "6c439b1a-ac1c-45b6-9700-f8a6594fb391";

  // Fetch accounts
  const accounts = await fetch(`http://localhost:3000/api/accounts?userId=${userId}`, {
    cache: "no-store"
  }).then(res => res.json());

  // Fetch transactions
  const transactions = await fetch(`http://localhost:3000/api/transactions?userId=${userId}`, {
    cache: "no-store"
  }).then(res => res.json());

  // Basic totals
  const totalExpenses = transactions
    .filter((t: any) => t.amount < 0)
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t: any) => t.amount > 0)
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const net = totalIncome + totalExpenses;

  return (
    <div className="p-10 space-y-10 font-sans">
      <h1 className="text-4xl font-bold">Dashboard</h1>

    {/* Add Transaction Form */}
      <TransactionForm userId={userId} accounts={accounts} />

    {/* Add Account Form */}
      <AccountForm userId={userId} />


      {/* Accounts */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
        <div className="space-y-2">
          {accounts.map((acc: any) => (
            <div
              key={acc.id}
              className="p-3 border rounded-md shadow-sm bg-white"
            >
              <div className="font-bold">{acc.name}</div>
              <div className="text-gray-600 text-sm">{acc.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Totals</h2>
        <div className="space-y-1 text-lg">
          <p className="text-green-600">Income: ${totalIncome.toFixed(2)}</p>
          <p className="text-red-600">Expenses: ${totalExpenses.toFixed(2)}</p>
          <p className="font-bold">Net: ${net.toFixed(2)}</p>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

        <div className="space-y-2">
          {transactions.map((t: any) => (
            <div
              key={t.id}
              className="p-3 border rounded-md bg-white shadow-sm flex justify-between"
            >
              <div>
                <div className="text-sm text-gray-500">{t.date.slice(0, 10)}</div>
                <div className="font-medium">{t.merchant}</div>
              </div>
              <div
                className={
                  t.amount < 0
                    ? "text-red-600 font-semibold"
                    : "text-green-600 font-semibold"
                }
              >
                ${t.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
