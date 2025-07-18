import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  return NextResponse.json({ message: "MongoDB connected!" });
}
