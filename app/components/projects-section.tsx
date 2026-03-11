"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SectionTitle } from ".";
import ProjectDrawer from "./project-drawer";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.6))",
	"linear-gradient(135deg,rgba(245,158,11,.6),rgba(139,92,246,.6))",
];
const EMOJIS = ["🚀", "✨", "📊", "🎯", "⚡", "🌊"];

function StatusDot({ status }: { status?: string }) {
	if (!status) return null;
	const ok = status === "Completed";
	return (
		<span
			className="font-mono text-xs px-2 py-0.5 rounded-full"
			style={{
				background: ok
					? "rgba(16,185,129,.12)"
					: "rgba(245,158,11,.12)",
				border: `1px solid ${ok ? "rgba(16,185,129,.3)" : "rgba(245,158,11,.3)"}`,
				color: ok ? "#10b981" : "#f59e0b",
				fontSize: 10,
			}}
		>
			{ok ? "● " : "◌ "}
			{status}
		</span>
	);
}

export default function ProjectsSection({ data }: { data: any }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const visible = data.projects.filter((p: any) => p.visible);

	// Read project id from URL and find the matching project
	const projectIdFromUrl = searchParams.get("project");
	const projectFromUrl = projectIdFromUrl
		? data.projects.find((p: any) => String(p.id) === projectIdFromUrl)
		: null;

	const [selected, setSelected] = useState<any>(projectFromUrl || null);

	// Sync drawer state when URL changes (e.g. direct link)
	useEffect(() => {
		if (projectFromUrl) {
			setSelected(projectFromUrl);
		}
	}, [projectIdFromUrl]);

	const openProject = useCallback(
		(p: any) => {
			setSelected(p);
			// Push ?project=id to URL — shareable link
			const params = new URLSearchParams(window.location.search);
			params.set("project", String(p.id));
			router.push(`?${params.toString()}`, { scroll: false });
		},
		[router],
	);

	const closeProject = useCallback(() => {
		setSelected(null);
		// Remove ?project param from URL
		const params = new URLSearchParams(window.location.search);
		params.delete("project");
		const qs = params.toString();
		router.push(qs ? `?${qs}` : window.location.pathname, {
			scroll: false,
		});
	}, [router]);

	return (
		<div
			className="min-h-screen
        pt-24 sm:pt-28 md:pt-32 lg:pt-36
        pb-12 sm:pb-16 md:pb-20
        px-4 sm:px-6 md:px-10
        max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
        mx-auto"
		>
			<SectionTitle label="002" title="Projects" />

			<div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
          gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12"
			>
				{visible.map((p: any, i: number) => (
					<div
						key={p.id}
						className="glass glass-hover p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 h-full"
						style={{ cursor: "pointer" }}
						onClick={() => openProject(p)}
					>
						{/* Thumbnail */}
						<div
							className="h-32 sm:h-36 md:h-40 rounded-xl flex items-center justify-center text-4xl sm:text-5xl overflow-hidden mb-1 sm:mb-2 relative"
							style={{
								background: GRADIENTS[i % GRADIENTS.length],
							}}
						>
							{p.image ? (
								<img
									src={p.image}
									alt={p.title}
									className="w-full h-full object-cover"
								/>
							) : (
								EMOJIS[i % EMOJIS.length]
							)}
							{/* Hover overlay */}
							<div
								className="project-overlay"
								style={{
									position: "absolute",
									inset: 0,
									background: "rgba(5,3,18,.75)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									opacity: 0,
									transition: "opacity .25s ease",
									borderRadius: 12,
								}}
							>
								<span
									className="font-mono text-xs uppercase tracking-widest text-white"
									style={{
										background: "rgba(139,92,246,.25)",
										border: "1px solid rgba(139,92,246,.5)",
										borderRadius: 8,
										padding: "8px 16px",
									}}
								>
									View Details →
								</span>
							</div>
						</div>

						{/* Title + status */}
						<div className="flex items-start justify-between gap-2">
							<h3 className="font-syne font-bold text-white text-base sm:text-lg md:text-xl">
								{p.title}
							</h3>
							{p.status && <StatusDot status={p.status} />}
						</div>

						<p
							className="font-mono text-xs leading-loose"
							style={{ color: "rgba(200,190,240,.65)" }}
						>
							{p.description}
						</p>

						{/* Meta */}
						{(p.role || p.year) && (
							<div className="flex gap-3 items-center">
								{p.role && (
									<span
										className="font-mono text-xs"
										style={{ color: "rgba(6,182,212,.7)" }}
									>
										{p.role}
									</span>
								)}
								{p.year && (
									<span
										className="font-mono text-xs"
										style={{
											color: "rgba(200,190,240,.3)",
										}}
									>
										{p.year}
									</span>
								)}
							</div>
						)}

						{/* Tags */}
						<div className="flex flex-wrap gap-1.5 sm:gap-2">
							{p.tags?.map((tag: string) => (
								<span key={tag} className="tag-badge">
									{tag}
								</span>
							))}
						</div>

						{/* Links — stopPropagation so card click doesn't also fire */}
						<div className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-2">
							{p.github && (
								<a
									href={p.github}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="proj-ghost font-mono text-xs rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 no-underline"
								>
									⌥ GitHub
								</a>
							)}
							{p.live && (
								<a
									href={p.live}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="proj-filled font-mono text-xs rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 no-underline"
								>
									↗ Live
								</a>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Hover overlay CSS */}
			<style>{`
        div:hover > div > .project-overlay { opacity: 1 !important; }
      `}</style>

			{/* Drawer */}
			{selected && (
				<ProjectDrawer project={selected} onClose={closeProject} />
			)}
		</div>
	);
}
