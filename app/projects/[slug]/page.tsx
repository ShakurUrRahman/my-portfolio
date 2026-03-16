import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Cursor from "@/app/components/cursor";
import Link from "next/link";
import ImageCell from "@/app/components/drawer-subcomponents/image-cell";
import PageImageArea from "./components/page-image-area";
import { createClient } from "@supabase/supabase-js";
import ProjectLinks from "@/app/components/project/project-links";
import { ChallengesLearnings } from "@/app/components/project/challenges-learnings";
import KeyFeatures from "@/app/components/project/key-features";
import HowItWorks from "@/app/components/project/how-it-works";
import {
	ProjectMeta,
	ProjectTags,
	ProjectTitle,
} from "@/app/components/project/project-hero";

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

						<ProjectTitle
							project={project}
							size="page"
							className="mb-5"
						/>
						<ProjectMeta
							project={project}
							className="justify-center mb-5"
							opacity=".35"
							showDuration={true}
						/>
						<ProjectTags
							project={project}
							className="justify-center mb-8"
						/>

						{/* CTA links */}
						{(project.github || project.live) && (
							<ProjectLinks
								github={project.github}
								live={project.live}
								className="flex gap-3 justify-center flex-wrap"
							/>
						)}
					</div>

					{/* ── 3-image grid ── */}
					<div className="mb-4 sm:mb-9">
						<PageImageArea
							images={project.images}
							className="mb-14 sm:mb-16"
							mobileHeight={220}
						/>
					</div>

					{/* ── Overview ── */}
					{project.overview && (
						<Section label="Overview" card>
							<p
								className="font-mono text-sm sm:text-base leading-loose"
								style={{ color: "rgba(200,190,240,.75)" }}
							>
								{project.overview}
							</p>
						</Section>
					)}

					{/* ── How It Works ── */}
					{project.howItWorks?.length > 0 && (
						<HowItWorks
							steps={project.howItWorks}
							variant="full"
							className="mb-12"
						/>
					)}

					{/* ── Key Features ── */}
					{project.features?.length > 0 && (
						<KeyFeatures
							features={project.features}
							gridClass="grid grid-cols-1 sm:grid-cols-2 gap-3"
						/>
					)}

					{/* ── Challenges & Learnings ── */}
					{(project.challenges?.length > 0 ||
						project.learnings.length > 0) && (
						<Section label="Insights">
							<ChallengesLearnings
								challenges={project.challenges}
								learnings={project.learnings}
								wrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
								cardClassName="rounded-2xl p-6"
								textSize="text-sm"
							/>
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
