import { useState } from "react";
import AdminAbout from "./admin-about";
import AdminProjects from "./admin-projects";
import AdminLogin from "./admin-login";
import AdminDashboard from "./admin-dashboard";
import AdminMessages from "./admin-message";
import AdminHome from "./admin-home";

export default function AdminPanel({ data, setData, setPage, onClose }) {
	const [authed, setAuthed] = useState(false);
	const [tab, setTab] = useState("dashboard");

	if (!authed)
		return (
			<AdminLogin
				onAuth={() => setAuthed(true)}
				setPage={setPage}
				onClose={onClose}
			/>
		);

	const tabs = [
		{ key: "dashboard", label: "📊 Dashboard" },
		{ key: "home", label: "🏠 Home" },
		{ key: "about", label: "👤 About" },
		{ key: "projects", label: "🚀 Projects" },
		{
			key: "messages",
			label: `💬 Messages${data.messages.length ? ` (${data.messages.length})` : ""}`,
		},
	];

	return (
		<div
			className="min-h-screen
      pt-20 sm:pt-22 md:pt-24
      pb-12 sm:pb-14 md:pb-16
      px-3 sm:px-4 md:px-6
      max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl
      mx-auto"
		>
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 md:mb-9">
				<div>
					<h2 className="font-syne font-extrabold text-white text-2xl sm:text-3xl">
						Admin Panel
					</h2>
					<p className="font-mono text-xs text-purple-400 mt-1 tracking-wider">
						Manage your portfolio content
					</p>
				</div>
				<div className="flex gap-2 sm:gap-3">
					<button
						onClick={() => {
							setAuthed(false);
							onClose();
						}}
						className="btn-logout font-mono text-xs rounded-lg px-3 sm:px-4 py-2"
						style={{ cursor: "pointer" }}
					>
						Logout
					</button>
				</div>
			</div>

			{/* Tab bar — scrollable on mobile */}
			<div
				className="flex gap-1 p-1 rounded-xl mb-5 sm:mb-6 md:mb-7 border overflow-x-auto"
				style={{
					background: "rgba(10,8,25,.4)",
					borderColor: "rgba(139,92,246,.12)",
					scrollbarWidth: "none",
				}}
			>
				{tabs.map((t) => (
					<button
						key={t.key}
						onClick={() => setTab(t.key)}
						className={`font-mono text-xs px-3 sm:px-4 md:px-5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0
              ${tab === t.key ? "admin-tab-active" : "admin-tab"}`}
						style={{ cursor: "pointer", border: "none" }}
					>
						{t.label}
					</button>
				))}
			</div>

			{tab === "dashboard" && <AdminDashboard data={data} />}
			{tab === "home" && <AdminHome data={data} setData={setData} />}
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
