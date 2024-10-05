
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    console.log(req);
    return NextResponse.json({ message : "Hello World" })
}

export const POST = async (req) => {
    return NextResponse.redirect("/api/auth/signin");
}