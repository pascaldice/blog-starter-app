import { NextResponse } from "next/server";

export const revalidate = 60;
// export const dynamic = "force-dynamic";

export async function GET() {
   // return NextResponse.json({ message: "Hello from Server", date: new Date() });
   const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
   const data = await res.json();
   return NextResponse.json(data);
}
