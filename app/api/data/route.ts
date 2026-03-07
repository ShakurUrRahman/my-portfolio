import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
	try {
		const { data, error } = await supabase
			.from("portfolio")
			.select("data")
			.eq("id", "main")
			.single();

		if (error) throw error;
		return NextResponse.json(data.data);
	} catch (e) {
		return NextResponse.json(
			{ error: "Failed to load data" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		if (!body || !body.about || !body.projects || !body.messages) {
			return NextResponse.json(
				{ error: "Invalid data" },
				{ status: 400 },
			);
		}

		const { error } = await supabase
			.from("portfolio")
			.update({ data: body, updated_at: new Date().toISOString() })
			.eq("id", "main");

		if (error) throw error;
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json(
			{ error: "Failed to save data" },
			{ status: 500 },
		);
	}
}
