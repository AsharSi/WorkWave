import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

// This function should handle the actual route, so the request and response need to be handled properly
export async function GET(req: Request, { params }: { params: { recruiterId: string } }) {
    const { recruiterId } = params;

    console.log("recruiterId:", recruiterId);
  
  try {
    const db = client.db("mylampai-company");
    const collection = db.collection("competitions");
    
    const data = await collection.find({}).toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/competition/recruiter/[recruiterId]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}