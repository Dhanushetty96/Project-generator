import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Template from "@/models/Template";

export async function GET(request) {
    try {
        await dbConnect();

        // Check if there's an ID in the query params
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            // Return a single template by ID
            const template = await Template.findById(id);

            if (!template) {
                return NextResponse.json(
                    { error: "Template not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(template);
        }

        // If no ID provided, return all templates (original behavior)
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
