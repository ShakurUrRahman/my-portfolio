"use client";

import { useEffect, useState, useCallback } from "react";
import { Section, StatusBadge } from "./drawer-subcomponents";
import ImageCell from "./drawer-subcomponents/image-cell";
import CopyLinkButton from "./drawer-subcomponents/copy-link-button";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.7),rgba(6,182,212,.5))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.5))",
	"linear-gradient(135deg,rgba(245,158,11,.5),rgba(139,92,246,.6))",
];

export default function ProjectDrawer({
	project,
	onClose,
}: {
	project: any;
	onClose: () => void;
}) {
	const [visible, setVisible] = useState(false);

	// Animate in + lock scroll
	useEffect(() => {
		requestAnimationFrame(() => setVisible(true));

		const hScroll = document.getElementById("h-scroll");
		const nav = document.querySelector("nav") as HTMLElement | null;
		document.body.classList.add("drawer-open");
		document.body.style.overflow = "hidden";
		if (hScroll) {
			hScroll.style.overflowX = "hidden";
			hScroll.style.overflowY = "auto";
		}
		if (nav) nav.style.display = "none";

		return () => {
			document.body.classList.remove("drawer-open");
			document.body.style.overflow = "";
			if (hScroll) {
				hScroll.style.overflowX = "auto";
				hScroll.style.overflowY = "hidden";
			}
			if (nav) nav.style.display = "";
		};
	}, []);

	const close = useCallback(() => {
		setVisible(false);
		setTimeout(onClose, 320);
	}, [onClose]);

	useEffect(() => {
		const fn = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", fn);
		return () => window.removeEventListener("keydown", fn);
	}, [close]);

	return (
		<>
			{/* Backdrop */}
			<div
				onClick={close}
				className="fixed inset-0 transition-opacity duration-300"
				style={{
					background: "rgba(0,0,0,.85)",
					zIndex: 990,
					opacity: visible ? 1 : 0,
					// backdropFilter: "blur(1px)",
					// WebkitBackdropFilter: "blur(1px)",
				}}
			/>

			{/* Drawer panel */}
			<div
				className="fixed top-0 right-0 h-full w-full overflow-y-auto"
				style={{
					maxWidth: 980,
					background: "rgb(5,3,18)",
					borderLeft: "1px solid rgba(139,92,246,.2)",
					zIndex: 991,
					transform: visible ? "translateX(0)" : "translateX(100%)",
					transition: "transform 320ms cubic-bezier(0.4,0,0.2,1)",
					scrollbarWidth: "thin",
					scrollbarColor: "rgba(139,92,246,.3) transparent",
				}}
			>
				{/* ── Sticky header ── */}
				<div
					className="sticky top-0 z-10 flex items-center justify-between gap-4 px-7 py-[18px]"
					style={{
						background: "rgba(5,3,18,.95)",
						backdropFilter: "blur(16px)",
						borderBottom: "1px solid rgba(139,92,246,.12)",
					}}
				>
					<div className="flex items-center ju gap-3 min-w-0">
						<span
							className="font-mono text-xs tracking-widest uppercase flex-shrink-0"
							style={{ color: "rgba(139,92,246,.5)" }}
						>
							Project
						</span>
						<span
							className="flex-shrink-0 w-px h-3.5"
							style={{ background: "rgba(139,92,246,.2)" }}
						/>
						<h1
							className="font-syne font-extrabold text-white truncate"
							style={{ fontSize: "clamp(14px,3vw,18px)" }}
						>
							{project.title.split(" ")[0]}
						</h1>
					</div>

					<div className="flex gap-2 flex-shrink-0">
						<CopyLinkButton projectId={project.id} />
						<button
							onClick={close}
							className="flex items-center justify-center w-[34px] h-[34px] rounded-lg text-base cursor-pointer"
							style={{
								background: "rgba(139,92,246,.1)",
								border: "1px solid rgba(139,92,246,.25)",
								color: "rgba(139,92,246,.8)",
							}}
						>
							✕
						</button>
					</div>
				</div>

				{/* ── Body ── */}
				<div className="px-7 pt-8 pb-16">
					{/* Title + meta */}
					<div className="mb-7 text-center">
						<h2
							className="font-syne font-extrabold text-white mb-3.5"
							style={{
								fontSize: "clamp(26px,5vw,38px)",
								lineHeight: 1.1,
								letterSpacing: "-0.02em",
							}}
						>
							{project.title}
						</h2>

						<div className="flex justify-center flex-wrap gap-2.5 items-center mb-4">
							{project.status && (
								<StatusBadge status={project.status} />
							)}
							{project.year && (
								<span
									className="font-mono text-xs uppercase tracking-widest"
									style={{ color: "rgba(200,190,240,.4)" }}
								>
									{project.year}
								</span>
							)}
							{project.duration && (
								<span
									className="font-mono text-xs"
									style={{ color: "rgba(200,190,240,.4)" }}
								>
									· {project.duration}
								</span>
							)}
							{project.role && (
								<span
									className="font-mono text-xs px-3 py-1 rounded-full"
									style={{
										background: "rgba(6,182,212,.1)",
										border: "1px solid rgba(6,182,212,.25)",
										color: "rgba(6,182,212,.85)",
									}}
								>
									{project.role}
								</span>
							)}
						</div>

						<div className="flex justify-center flex-wrap gap-2">
							{project.tags?.map((tag: string) => (
								<span key={tag} className="tag-badge">
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* 3-image grid */}
					<div className="mb-9">
						<p
							className="font-mono text-xs uppercase tracking-widest mb-4"
							style={{ color: "rgba(139,92,246,.5)" }}
						>
							Preview
						</p>
						<div
							className="grid gap-2.5 rounded-2xl overflow-hidden"
							style={{
								gridTemplateColumns: "1fr 1fr",
								gridTemplateRows: "180px 180px",
							}}
						>
							<ImageCell
								src={project.images?.[0]}
								gradient={GRADIENTS[0]}
								emoji="🚀"
								style={{ gridRow: "1 / 3" }}
							/>
							<ImageCell
								src={project.images?.[1]}
								gradient={GRADIENTS[1]}
								emoji="⚡"
							/>
							<ImageCell
								src={project.images?.[2]}
								gradient={GRADIENTS[2]}
								emoji="✦"
							/>
						</div>
					</div>

					{/* Overview */}
					{project.overview && (
						<Section label="Overview">
							<p
								className="font-mono text-sm leading-loose"
								style={{ color: "rgba(200,190,240,.75)" }}
							>
								{project.overview}
							</p>
						</Section>
					)}

					{/* How It Works */}
					{project.howItWorks?.length > 0 && (
						<Section label="How It Works">
							<div className="flex flex-col gap-3.5">
								{project.howItWorks.map(
									(step: string, i: number) => (
										<div
											key={i}
											className="flex gap-4 items-start"
										>
											<span
												className="font-syne font-extrabold flex items-center justify-center flex-shrink-0 rounded-md mt-px"
												style={{
													fontSize: 11,
													width: 28,
													height: 28,
													minWidth: 28,
													color: "rgba(139,92,246,.6)",
													background:
														"rgba(139,92,246,.08)",
													border: "1px solid rgba(139,92,246,.2)",
												}}
											>
												{String(i + 1).padStart(2, "0")}
											</span>
											<p
												className="font-mono text-sm leading-loose"
												style={{
													color: "rgba(200,190,240,.7)",
												}}
											>
												{step}
											</p>
										</div>
									),
								)}
							</div>
						</Section>
					)}

					{/* Key Features */}
					{project.features?.length > 0 && (
						<Section label="Key Features">
							<div
								className="grid gap-2.5"
								style={{
									gridTemplateColumns:
										"repeat(auto-fill,minmax(200px,1fr))",
								}}
							>
								{project.features.map(
									(f: string, i: number) => (
										<div
											key={i}
											className="flex items-center gap-2.5 rounded-xl px-4 py-3"
											style={{
												background:
													"rgba(139,92,246,.06)",
												border: "1px solid rgba(139,92,246,.15)",
											}}
										>
											<span
												className="text-sm"
												style={{
													color: "rgba(6,182,212,.8)",
												}}
											>
												✦
											</span>
											<span
												className="font-mono text-xs leading-snug"
												style={{
													color: "rgba(200,190,240,.8)",
												}}
											>
												{f}
											</span>
										</div>
									),
								)}
							</div>
						</Section>
					)}

					{/* Challenges & Learnings */}
					{(project.challenges || project.learnings) && (
						<div
							className="grid gap-3 mb-7 whitespace-pre-wrap"
							style={{
								gridTemplateColumns:
									project.challenges && project.learnings
										? "1fr 1fr"
										: "1fr",
							}}
						>
							{project.challenges && (
								<div
									className="rounded-xl p-5"
									style={{
										background: "rgba(239,68,68,.05)",
										border: "1px solid rgba(239,68,68,.15)",
									}}
								>
									<p
										className="font-mono text-xs uppercase tracking-widest mb-3"
										style={{ color: "rgba(239,68,68,.6)" }}
									>
										⚠ Challenges
									</p>
									<p
										className="font-mono text-xs leading-loose"
										style={{
											color: "rgba(200,190,240,.65)",
										}}
									>
										{project.challenges}
									</p>
								</div>
							)}
							{project.learnings && (
								<div
									className="rounded-xl p-5"
									style={{
										background: "rgba(16,185,129,.05)",
										border: "1px solid rgba(16,185,129,.15)",
									}}
								>
									<p
										className="font-mono text-xs uppercase tracking-widest mb-3"
										style={{ color: "rgba(16,185,129,.6)" }}
									>
										✦ Learnings
									</p>
									<p
										className="font-mono text-xs leading-loose"
										style={{
											color: "rgba(200,190,240,.65)",
										}}
									>
										{project.learnings}
									</p>
								</div>
							)}
						</div>
					)}

					{/* Links */}
					{(project.github || project.live) && (
						<div className="flex gap-3 flex-wrap">
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="proj-ghost font-mono text-xs rounded-xl no-underline inline-flex items-center gap-2 px-6 py-3"
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
									</svg>
									View Source
								</a>
							)}
							{project.live && (
								<a
									href={project.live}
									target="_blank"
									rel="noopener noreferrer"
									className="proj-filled font-mono text-xs rounded-xl no-underline inline-flex items-center gap-2 px-6 py-3"
								>
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
									>
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
										<polyline points="15 3 21 3 21 9" />
										<line x1="10" y1="14" x2="21" y2="3" />
									</svg>
									Live Demo
								</a>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
