import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Template from "@/models/Template";

export async function GET() {
    try {
        await dbConnect();
        const templates = await Template.find({});
        return NextResponse.json(templates);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newTemplate = new Template(body);
        await newTemplate.save();
        return NextResponse.json(newTemplate, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
