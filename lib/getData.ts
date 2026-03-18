import { createClient } from "@supabase/supabase-js";

export async function getData() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_KEY!,
	);
	const { data } = await supabase
		.from("portfolio")
		.select("data")
		.eq("id", "main")
		.single();
	return data?.data ?? null;
}
