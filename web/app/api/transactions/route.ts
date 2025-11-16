export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accountId, date, amount, merchant, categoryId } = body;

    if (!accountId || !date || !amount) {
      return NextResponse.json(
        { error: "accountId, date, and amount are required" },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        accountId,
        date: new Date(date),
        amount,
        merchant,
        categoryId,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



// GET /api/transactions?accountId=xxxx OR /api/transactions?userId=xxxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const accountId = searchParams.get("accountId");

    // Require at least one filter
    if (!userId && !accountId) {
      return NextResponse.json(
        { error: "Missing userId or accountId" },
        { status: 400 }
      );
    }

    let transactions;

    // 1️⃣ Fetch by accountId
    if (accountId) {
      transactions = await prisma.transaction.findMany({
        where: { accountId },
        orderBy: { date: "desc" }
      });
    }

    // 2️⃣ Fetch by userId (across all accounts)
    else if (userId) {
      transactions = await prisma.transaction.findMany({
        where: {
          account: {
            userId: userId
          }
        },
        orderBy: { date: "desc" },
        include: {
          account: true // optional, includes account details
        }
      });
    }

    return NextResponse.json(transactions, { status: 200 });

  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

