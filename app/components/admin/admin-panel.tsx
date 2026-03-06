import { useState } from "react";
import AdminAbout from "./admin-about";
import AdminProjects from "./admin-projects";
import AdminLogin from "./admin-login";
import AdminDashboard from "./admin-dashboard";
import AdminMessages from "./admin-message";

export default function AdminPanel({ data, setData }) {
	const [authed, setAuthed] = useState(false);
	const [tab, setTab] = useState("dashboard");
	if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} />;

	const tabs = [
		{ key: "dashboard", label: "📊 Dashboard" },
		{ key: "about", label: "👤 About" },
		{ key: "projects", label: "🚀 Projects" },
		{
			key: "messages",
			label: `💬 Messages${data.messages.length ? ` (${data.messages.length})` : ""}`,
		},
	];

	return (
		<div className="min-h-screen pt-24 pb-16 px-6 max-w-5xl mx-auto">
			<div className="flex items-center justify-between mb-9">
				<div>
					<h2 className="font-syne font-extrabold text-white text-3xl">
						Admin Panel
					</h2>
					<p className="font-mono text-xs text-purple-400 mt-1 tracking-wider">
						Manage your portfolio content
					</p>
				</div>
				<div className="flex gap-3">
					<button
						onClick={() => {
							const container = document.querySelector(
								".smooth-horizontal-scroll",
							);
							if (container)
								container.scrollTo({
									left: 0,
									behavior: "smooth",
								});
						}}
						className="btn-ghost font-mono text-xs rounded-lg px-4 py-2"
						style={{ cursor: "pointer" }}
					>
						← Portfolio
					</button>
					<button
						onClick={() => setAuthed(false)}
						className="btn-logout font-mono text-xs rounded-lg px-4 py-2"
						style={{ cursor: "pointer" }}
					>
						Logout
					</button>
				</div>
			</div>

			<div
				className="flex flex-wrap gap-1 p-1 rounded-xl mb-7 border"
				style={{
					background: "rgba(10,8,25,.4)",
					borderColor: "rgba(139,92,246,.12)",
				}}
			>
				{tabs.map((t) => (
					<button
						key={t.key}
						onClick={() => setTab(t.key)}
						className={`font-mono text-xs px-5 py-2 rounded-lg transition-all duration-200 ${tab === t.key ? "admin-tab-active" : "admin-tab"}`}
						style={{ cursor: "pointer", border: "none" }}
					>
						{t.label}
					</button>
				))}
			</div>

			{tab === "dashboard" && <AdminDashboard data={data} />}
			{tab === "about" && <AdminAbout data={data} setData={setData} />}
			{tab === "projects" && (
				<AdminProjects data={data} setData={setData} />
			)}
			{tab === "messages" && (
				<AdminMessages data={data} setData={setData} />
			)}
		</div>
	);
}
