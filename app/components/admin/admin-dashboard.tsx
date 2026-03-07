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
		/* 2-col on mobile, 4-col on md+ */
		<div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
			{stats.map((s) => (
				<Glass key={s.label} hover className="p-4 sm:p-5 md:p-7">
					<div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
						{s.icon}
					</div>
					<div className="font-syne font-extrabold text-white text-2xl sm:text-3xl md:text-4xl">
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
