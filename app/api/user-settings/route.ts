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

  const updatedSettings = await prisma.userSettings.update({
    where: { userID: user.id },
    data: { currency },
  });

  return NextResponse.json(updatedSettings);
}
