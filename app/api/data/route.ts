import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_KEY;
	if (!url || !key) throw new Error("Missing Supabase env vars");
	return createClient(url, key);
}

export async function GET() {
	try {
		const supabase = getSupabase();
		const { data, error } = await supabase
			.from("portfolio")
			.select("data")
			.eq("id", "main")
			.single();

		if (error) throw error;
		return NextResponse.json(data.data);
	} catch (e) {
		return NextResponse.json({ error: "Failed to load" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const supabase = getSupabase();
		const body = await req.json();

		// Minimal validation — just needs to be an object with about
		if (!body || typeof body !== "object" || !body.about) {
			return NextResponse.json(
				{ error: "Invalid data" },
				{ status: 400 },
			);
		}

		// upsert instead of update — creates row if missing
		const { error } = await supabase
			.from("portfolio")
			.upsert(
				{
					id: "main",
					data: body,
					updated_at: new Date().toISOString(),
				},
				{ onConflict: "id" },
			);

		if (error) throw error;
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		console.error("Save error:", e?.message);
		return NextResponse.json({ error: "Failed to save" }, { status: 500 });
	}
}
