"use client";

import { useEffect, useState, useCallback } from "react";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.7),rgba(6,182,212,.5))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.5))",
	"linear-gradient(135deg,rgba(245,158,11,.5),rgba(139,92,246,.6))",
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
	const ok = status === "Completed";
	return (
		<span
			className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full"
			style={{
				background: ok
					? "rgba(16,185,129,.15)"
					: "rgba(245,158,11,.15)",
				border: `1px solid ${ok ? "rgba(16,185,129,.35)" : "rgba(245,158,11,.35)"}`,
				color: ok ? "#10b981" : "#f59e0b",
			}}
		>
			{ok ? "● " : "◌ "}
			{status}
		</span>
	);
}

function Section({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div style={{ marginBottom: 28 }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 12,
					marginBottom: 16,
				}}
			>
				<p
					className="font-mono text-xs uppercase tracking-widest"
					style={{
						color: "rgba(139,92,246,.5)",
						whiteSpace: "nowrap",
					}}
				>
					{label}
				</p>
				<div
					style={{
						flex: 1,
						height: 1,
						background:
							"linear-gradient(to right, rgba(139,92,246,.2), transparent)",
					}}
				/>
			</div>
			{children}
		</div>
	);
}

function ImageCell({ src, gradient, emoji, style }: any) {
	return (
		<div
			style={{
				background: gradient,
				borderRadius: 10,
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: 40,
				position: "relative",
				...style,
			}}
		>
			{src ? (
				<img
					src={src}
					alt=""
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			) : (
				<>
					<div
						style={{
							position: "absolute",
							inset: 0,
							background: gradient,
						}}
					/>
					<span
						style={{
							position: "relative",
							zIndex: 1,
							opacity: 0.7,
						}}
					>
						{emoji}
					</span>
				</>
			)}
		</div>
	);
}

function CopyLinkButton({ projectId }: { projectId: number | string }) {
	const [copied, setCopied] = useState(false);

	const copy = () => {
		const url = `${window.location.origin}${window.location.pathname}?project=${projectId}`;
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<button
			onClick={copy}
			title="Copy shareable link"
			style={{
				background: copied
					? "rgba(16,185,129,.15)"
					: "rgba(139,92,246,.08)",
				border: `1px solid ${copied ? "rgba(16,185,129,.4)" : "rgba(139,92,246,.25)"}`,
				borderRadius: 8,
				height: 34,
				padding: "0 12px",
				display: "flex",
				alignItems: "center",
				gap: 6,
				cursor: "pointer",
				color: copied ? "#10b981" : "rgba(139,92,246,.8)",
				fontSize: 12,
				fontFamily: "'DM Mono', monospace",
				transition: "all .2s",
				whiteSpace: "nowrap",
			}}
		>
			{copied ? (
				<>
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
					Copied!
				</>
			) : (
				<>
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
						<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
					</svg>
					Share
				</>
			)}
		</button>
	);
}

// ─────────────────────────────────────────────
// Main Drawer
// ─────────────────────────────────────────────

export default function ProjectDrawer({
	project,
	onClose,
}: {
	project: any;
	onClose: () => void;
}) {
	const [visible, setVisible] = useState(false);

	// Animate in + lock scroll (all in one effect)
	useEffect(() => {
		requestAnimationFrame(() => setVisible(true));

		const hScroll = document.getElementById("h-scroll");
		const nav = document.querySelector("nav");
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

	// ESC to close
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
				style={{
					position: "fixed",
					inset: 0,
					background: "rgba(0,0,0,.75)",
					zIndex: 990,
					opacity: visible ? 1 : 0,
					transition: "opacity 320ms ease",
				}}
			/>

			{/* Drawer panel */}
			<div
				style={{
					position: "fixed",
					top: 0,
					right: 0,
					height: "100%",
					width: "100%",
					maxWidth: 680,
					background: "rgba(5,3,18,.97)",
					backdropFilter: "blur(24px)",
					WebkitBackdropFilter: "blur(24px)",
					borderLeft: "1px solid rgba(139,92,246,.2)",
					zIndex: 991,
					overflowY: "auto",
					transform: visible ? "translateX(0)" : "translateX(100%)",
					transition: "transform 320ms cubic-bezier(0.4,0,0.2,1)",
					scrollbarWidth: "thin",
					scrollbarColor: "rgba(139,92,246,.3) transparent",
				}}
			>
				{/* ── Sticky header ── */}
				<div
					style={{
						position: "sticky",
						top: 0,
						zIndex: 10,
						background: "rgba(5,3,18,.92)",
						backdropFilter: "blur(16px)",
						borderBottom: "1px solid rgba(139,92,246,.12)",
						padding: "18px 28px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 16,
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							minWidth: 0,
						}}
					>
						<span
							className="font-mono text-xs tracking-widest uppercase"
							style={{
								color: "rgba(139,92,246,.5)",
								flexShrink: 0,
							}}
						>
							Project
						</span>
						<span
							style={{
								width: 1,
								height: 14,
								background: "rgba(139,92,246,.2)",
								flexShrink: 0,
							}}
						/>
						<h1
							className="font-syne font-extrabold text-white truncate"
							style={{ fontSize: "clamp(14px,3vw,18px)" }}
						>
							{project.title}
						</h1>
					</div>

					<div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
						<CopyLinkButton projectId={project.id} />
						<button
							onClick={close}
							style={{
								background: "rgba(139,92,246,.1)",
								border: "1px solid rgba(139,92,246,.25)",
								borderRadius: 8,
								width: 34,
								height: 34,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								color: "rgba(139,92,246,.8)",
								fontSize: 16,
							}}
						>
							✕
						</button>
					</div>
				</div>

				{/* ── Body ── */}
				<div style={{ padding: "32px 28px 60px" }}>
					{/* Title + meta */}
					<div style={{ marginBottom: 28 }}>
						<h2
							className="font-syne font-extrabold text-white"
							style={{
								fontSize: "clamp(26px,5vw,38px)",
								lineHeight: 1.1,
								letterSpacing: "-0.02em",
								marginBottom: 14,
							}}
						>
							{project.title}
						</h2>

						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 10,
								alignItems: "center",
								marginBottom: 16,
							}}
						>
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

						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 8,
							}}
						>
							{project.tags?.map((tag: string) => (
								<span key={tag} className="tag-badge">
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* 3-image grid */}
					<div style={{ marginBottom: 36 }}>
						<p
							className="font-mono text-xs uppercase tracking-widest mb-4"
							style={{ color: "rgba(139,92,246,.5)" }}
						>
							Preview
						</p>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gridTemplateRows: "180px 180px",
								gap: 10,
								borderRadius: 14,
								overflow: "hidden",
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
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 14,
								}}
							>
								{project.howItWorks.map(
									(step: string, i: number) => (
										<div
											key={i}
											style={{
												display: "flex",
												gap: 16,
												alignItems: "flex-start",
											}}
										>
											<span
												className="font-syne font-extrabold"
												style={{
													fontSize: 11,
													color: "rgba(139,92,246,.6)",
													background:
														"rgba(139,92,246,.08)",
													border: "1px solid rgba(139,92,246,.2)",
													borderRadius: 6,
													width: 28,
													height: 28,
													minWidth: 28,
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													marginTop: 1,
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
								style={{
									display: "grid",
									gridTemplateColumns:
										"repeat(auto-fill,minmax(200px,1fr))",
									gap: 10,
								}}
							>
								{project.features.map(
									(f: string, i: number) => (
										<div
											key={i}
											style={{
												background:
													"rgba(139,92,246,.06)",
												border: "1px solid rgba(139,92,246,.15)",
												borderRadius: 10,
												padding: "12px 16px",
												display: "flex",
												alignItems: "center",
												gap: 10,
											}}
										>
											<span
												style={{
													color: "rgba(6,182,212,.8)",
													fontSize: 14,
												}}
											>
												✦
											</span>
											<span
												className="font-mono text-xs"
												style={{
													color: "rgba(200,190,240,.8)",
													lineHeight: 1.5,
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
							style={{
								display: "grid",
								gridTemplateColumns:
									project.challenges && project.learnings
										? "1fr 1fr"
										: "1fr",
								gap: 12,
								marginBottom: 28,
							}}
						>
							{project.challenges && (
								<div
									style={{
										background: "rgba(239,68,68,.05)",
										border: "1px solid rgba(239,68,68,.15)",
										borderRadius: 12,
										padding: 20,
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
									style={{
										background: "rgba(16,185,129,.05)",
										border: "1px solid rgba(16,185,129,.15)",
										borderRadius: 12,
										padding: 20,
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
						<div
							style={{
								display: "flex",
								gap: 12,
								flexWrap: "wrap",
							}}
						>
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="proj-ghost font-mono text-xs rounded-xl no-underline"
									style={{
										padding: "12px 24px",
										display: "inline-flex",
										alignItems: "center",
										gap: 8,
									}}
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
									className="proj-filled font-mono text-xs rounded-xl no-underline"
									style={{
										padding: "12px 24px",
										display: "inline-flex",
										alignItems: "center",
										gap: 8,
									}}
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
