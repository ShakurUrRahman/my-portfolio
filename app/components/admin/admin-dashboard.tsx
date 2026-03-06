import { Glass } from "..";

export default function AdminDashboard({ data }) {
	const stats = [
		{ label: "Projects", value: data.projects.length, icon: "🚀" },
		{
			label: "Visible",
			value: data.projects.filter((p) => p.visible).length,
			icon: "👁️",
		},
		{ label: "Messages", value: data.messages.length, icon: "💬" },
		{
			label: "Status",
			value: data.about.available ? "Open" : "Closed",
			icon: "⚡",
		},
	];
	return (
		<div
			className="grid gap-5"
			style={{
				gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
			}}
		>
			{stats.map((s) => (
				<Glass key={s.label} hover className="p-7">
					<div className="text-3xl mb-3">{s.icon}</div>
					<div className="font-syne font-extrabold text-white text-4xl">
						{s.value}
					</div>
					<div
						className="font-mono text-xs uppercase tracking-widest mt-1"
						style={{ color: "rgba(200,190,240,.5)" }}
					>
						{s.label}
					</div>
				</Glass>
			))}
		</div>
	);
}
