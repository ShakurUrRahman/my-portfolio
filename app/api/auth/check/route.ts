import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = await cookies();
	const auth = cookieStore.get("admin_auth");

	if (auth && auth.value === process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ ok: true });
	}
	return NextResponse.json({ ok: false });
}
