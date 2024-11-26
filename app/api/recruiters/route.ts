
import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export const GET = async () => {
    try {
        const db = client.db("mylampai-company");
        const collection = db.collection("recruiters");
        const data = await collection.find({}).toArray();
        return NextResponse.json(data);
    } catch (error) {
        console.log("Error in GET /api/recruiters", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}