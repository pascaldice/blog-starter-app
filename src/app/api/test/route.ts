import { NextResponse } from "next/server";

// export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function GET() {
   return NextResponse.json({ message: "Hello from Server", date: new Date() });
}
