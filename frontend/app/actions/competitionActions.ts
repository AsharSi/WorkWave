"use server";
import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

const getCompetitionsByRecruiter = async (recruiterId: string) => {
    console.log("recruiterId:", recruiterId);

    try {
        const db = client.db("mylampai-company");
        const collection = db.collection("competitions");

        const data = await collection.find({}).toArray();
        
        return NextResponse.json(data);
    } catch (error) {
        console.log("Error in GET /api/competition/recruiter/[recruiterId]", error);
        NextResponse.json([], { status: 500 });
    }
};

export { getCompetitionsByRecruiter };