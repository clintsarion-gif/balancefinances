export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Prisma from "@prisma/client";

const prisma = new Prisma();


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, type } = body;

    if (!userId || !name || !type) {
      return NextResponse.json(
        { error: "userId, name, and type are required" },
        { status: 400 }
      );
    }

    const account = await prisma.account.create({
      data: {
        userId,
        name,
        type,
      },
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// GET /api/accounts?userId=xxxx

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");



    if (!userId) {

      return NextResponse.json(

        { error: "Missing userId" },

        { status: 400 }

      );

    }




    const accounts = await prisma.account.findMany({

      where: { userId },

      orderBy: { createdAt: "desc" }

    });



    return NextResponse.json(accounts, { status: 200 });



  } catch (error) {

    console.error("Error fetching accounts:", error);

    return NextResponse.json(

      { error: "Internal Server Error" },

      { status: 500 }

    );

  }

}





