import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: { userID: user.id },
  });

  return NextResponse.json(userSettings || { currency: "Nepal" });
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.redirect("/sign-in");
  }

  const { currency } = await request.json();

  if (!currency || typeof currency !== "string") {
    return NextResponse.json(
      {
        error: "Currency is required and must be a string",
      },
      { status: 400 }
    );
  }

  try {
    const updatedSettings = await prisma.userSettings.upsert({
      where: { userID: user.id },
      update: { currency },
      create: { userID: user.id, currency },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Error updating user settings:", error);
    return NextResponse.json(
      { error: "Failed to update user settings" },
      { status: 400 }
    );
  }
}
