import { NextResponse } from "next/server";

export async function GET() {
   return NextResponse.json({ message: "Hello from Server", date: new Date() });
}

export const revalidate = 60;
