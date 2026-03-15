import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Cursor from "@/app/components/cursor";
import Link from "next/link";
import ImageCell from "@/app/components/drawer-subcomponents/image-cell";
import PageImageArea from "./components/page-image-area";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

// ── Data fetching ──────────────────────────────────────────────────
async function getData() {
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

export async function generateStaticParams() {
	const data = await getData();
	return (data?.projects ?? [])
		.filter((p: any) => p.slug && typeof p.slug === "string")
		.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const data = await getData();
	const project = data?.projects?.find(
		(p: any) => String(p.slug) === params.slug,
	);
	if (!project) return { title: "Project Not Found" };
	return {
		title: `${project.title} — Shakur Portfolio`,
		description: project.description,
	};
}

// ── Sub-components ─────────────────────────────────────────────────
const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.7),rgba(6,182,212,.5))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.5))",
	"linear-gradient(135deg,rgba(245,158,11,.5),rgba(139,92,246,.6))",
];

function StatusBadge({ status }: { status: string }) {
	const ok = status === "Completed";
	return (
		<span
			className="font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest"
			style={{
				background: ok
					? "rgba(16,185,129,.12)"
					: "rgba(245,158,11,.12)",
				border: `1px solid ${ok ? "rgba(16,185,129,.3)" : "rgba(245,158,11,.3)"}`,
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
		<div className="mb-10 sm:mb-12">
			<div className="flex items-center gap-4 mb-5">
				<p
					className="font-mono text-xs uppercase tracking-widest flex-shrink-0"
					style={{ color: "rgba(139,92,246,.5)" }}
				>
					{label}
				</p>
				<div
					className="flex-1 h-px"
					style={{
						background:
							"linear-gradient(to right, rgba(139,92,246,.2), transparent)",
					}}
				/>
			</div>
			{children}
		</div>
	);
}

// ── Page ───────────────────────────────────────────────────────────
export default async function ProjectPage({
	params,
}: {
	params: { id: string };
}) {
	const data = await getData();
	const project = data?.projects?.find((p: any) => p.slug === params.slug);
	if (!project) notFound();

	return (
		<div style={{ background: "rgb(2,2,8)", minHeight: "100vh" }}>
			<Cursor />
			{/* ── Stars background ── */}
			<div
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 0,
					overflow: "hidden",
					pointerEvents: "none",
				}}
			>
				{Array.from({ length: 60 }, (_, i) => (
					<div
						key={i}
						style={{
							position: "absolute",
							left: `${(i * 137.5) % 100}%`,
							top: `${(i * 97.3) % 100}%`,
							width: i % 5 === 0 ? 2 : 1,
							height: i % 5 === 0 ? 2 : 1,
							borderRadius: "50%",
							background: "rgba(200,190,240,.4)",
						}}
					/>
				))}
				<div
					style={{
						position: "absolute",
						top: "20%",
						left: "60%",
						width: 500,
						height: 500,
						borderRadius: "50%",
						background:
							"radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 70%)",
					}}
				/>
				<div
					style={{
						position: "absolute",
						top: "60%",
						left: "20%",
						width: 400,
						height: 400,
						borderRadius: "50%",
						background:
							"radial-gradient(circle,rgba(6,182,212,.04) 0%,transparent 70%)",
					}}
				/>
			</div>

			{/* ── Nav bar ── */}
			<nav
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 100,
					background: "rgba(2,2,8,.85)",
					backdropFilter: "blur(20px)",
					borderBottom: "1px solid rgba(139,92,246,.1)",
					padding: "16px 28px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Link
					href="/"
					style={{
						fontFamily: "'Syne',sans-serif",
						fontWeight: 800,
						fontSize: 20,
						color: "#fff",
						textDecoration: "none",
						letterSpacing: "-0.02em",
					}}
				>
					SR
				</Link>
				<Link
					href="/"
					className="font-mono text-xs inline-flex items-center gap-2 no-underline px-4 py-2 rounded-lg"
					style={{
						color: "rgba(139,92,246,.8)",
						background: "rgba(139,92,246,.08)",
						border: "1px solid rgba(139,92,246,.2)",
					}}
				>
					← Back to Portfolio
				</Link>
			</nav>

			{/* ── Main content ── */}
			<main className="relative" style={{ zIndex: 1, paddingTop: 100 }}>
				<div
					className="mx-auto px-4 sm:px-6 md:px-10"
					style={{ maxWidth: 1260 }}
				>
					{/* ── Hero ── */}
					<div className="text-center mb-10 sm:mb-14">
						{/* Eyebrow */}
						<p
							className="font-mono text-xs uppercase tracking-widest mb-5"
							style={{ color: "rgba(139,92,246,.5)" }}
						>
							Case Study
						</p>

						{/* Title */}
						<h1
							className="font-syne font-extrabold text-white mb-5"
							style={{
								fontSize: "clamp(32px,7vw,60px)",
								lineHeight: 1.05,
								letterSpacing: "-0.03em",
							}}
						>
							{project.title}
						</h1>

						{/* Meta row */}
						<div className="flex flex-wrap gap-3 items-center justify-center mb-5">
							{project.status && (
								<StatusBadge status={project.status} />
							)}
							{project.year && (
								<span
									className="font-mono text-xs uppercase tracking-widest"
									style={{ color: "rgba(200,190,240,.35)" }}
								>
									{project.year}
								</span>
							)}
							{project.duration && (
								<span
									className="font-mono text-xs"
									style={{ color: "rgba(200,190,240,.35)" }}
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

						{/* Tags */}
						<div className="flex flex-wrap gap-2 justify-center mb-8">
							{project.tags?.map((tag: string) => (
								<span key={tag} className="tag-badge">
									{tag}
								</span>
							))}
						</div>

						{/* CTA links */}
						{(project.github || project.live) && (
							<div className="flex gap-3 justify-center flex-wrap">
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
											<line
												x1="10"
												y1="14"
												x2="21"
												y2="3"
											/>
										</svg>
										Live Demo
									</a>
								)}
							</div>
						)}
					</div>

					{/* ── 3-image grid ── */}
					<div className="mb-4 sm:mb-9">
						<p
							className="font-mono text-xs uppercase tracking-widest mb-4"
							style={{ color: "rgba(139,92,246,.5)" }}
						>
							Preview
						</p>

						{/* Mobile: single image */}
						{/* Mobile: single image */}
						<PageImageArea
							images={project.images ?? [null, null, null]}
						/>
					</div>

					{/* ── Overview ── */}
					{project.overview && (
						<Section label="Overview">
							<div
								className="rounded-2xl p-6 sm:p-8"
								style={{
									background: "rgba(139,92,246,.04)",
									border: "1px solid rgba(139,92,246,.12)",
								}}
							>
								<p
									className="font-mono text-sm sm:text-base leading-loose"
									style={{ color: "rgba(200,190,240,.75)" }}
								>
									{project.overview}
								</p>
							</div>
						</Section>
					)}

					{/* ── How It Works ── */}
					{project.howItWorks?.length > 0 && (
						<Section label="How It Works">
							<div className="flex flex-col gap-4">
								{project.howItWorks.map(
									(step: string, i: number) => (
										<div
											key={i}
											className="flex gap-5 items-start"
										>
											<span
												className="font-syne font-extrabold flex-shrink-0 flex items-center justify-center rounded-xl"
												style={{
													width: 40,
													height: 40,
													minWidth: 40,
													fontSize: 13,
													color: "rgba(139,92,246,.8)",
													background:
														"rgba(139,92,246,.08)",
													border: "1px solid rgba(139,92,246,.2)",
												}}
											>
												{String(i + 1).padStart(2, "0")}
											</span>
											<div
												className="flex-1 rounded-xl px-5 py-4"
												style={{
													background:
														"rgba(139,92,246,.04)",
													border: "1px solid rgba(139,92,246,.1)",
												}}
											>
												<p
													className="font-mono text-sm leading-loose"
													style={{
														color: "rgba(200,190,240,.7)",
													}}
												>
													{step}
												</p>
											</div>
										</div>
									),
								)}
							</div>
						</Section>
					)}

					{/* ── Key Features ── */}
					{project.features?.length > 0 && (
						<Section label="Key Features">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{project.features.map(
									(f: string, i: number) => (
										<div
											key={i}
											className="flex items-start gap-3 rounded-xl px-5 py-4"
											style={{
												background:
													"rgba(139,92,246,.06)",
												border: "1px solid rgba(139,92,246,.15)",
											}}
										>
											<span
												className="flex-shrink-0 mt-0.5"
												style={{
													color: "rgba(6,182,212,.8)",
													fontSize: 14,
												}}
											>
												✦
											</span>
											<span
												className="font-mono text-xs sm:text-sm leading-loose"
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

					{/* ── Challenges & Learnings ── */}
					{(project.challenges || project.learnings) && (
						<Section label="Insights">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 whitespace-pre-wrap">
								{project.challenges && (
									<div
										className="rounded-2xl p-6"
										style={{
											background: "rgba(239,68,68,.05)",
											border: "1px solid rgba(239,68,68,.15)",
										}}
									>
										<p
											className="font-mono text-xs uppercase tracking-widest mb-4"
											style={{
												color: "rgba(239,68,68,.6)",
											}}
										>
											⚠ Challenges
										</p>
										<p
											className="font-mono text-sm leading-loose"
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
										className="rounded-2xl p-6"
										style={{
											background: "rgba(16,185,129,.05)",
											border: "1px solid rgba(16,185,129,.15)",
										}}
									>
										<p
											className="font-mono text-xs uppercase tracking-widest mb-4"
											style={{
												color: "rgba(16,185,129,.6)",
											}}
										>
											✦ Learnings
										</p>
										<p
											className="font-mono text-sm leading-loose"
											style={{
												color: "rgba(200,190,240,.65)",
											}}
										>
											{project.learnings}
										</p>
									</div>
								)}
							</div>
						</Section>
					)}

					{/* ── Footer CTA ── */}
					<div
						className="mt-10 mb-16 rounded-2xl p-8 sm:p-12 text-center"
						style={{
							background: "rgba(139,92,246,.06)",
							border: "1px solid rgba(139,92,246,.15)",
						}}
					>
						<p
							className="font-mono text-xs uppercase tracking-widest mb-3"
							style={{ color: "rgba(139,92,246,.5)" }}
						>
							Like what you see?
						</p>
						<p className="font-syne font-bold text-white text-xl sm:text-2xl mb-6">
							Let's work together
						</p>
						<Link
							href="/?section=4"
							className="proj-filled font-mono text-xs rounded-xl no-underline inline-flex items-center gap-2 px-8 py-3"
						>
							Get in Touch →
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
