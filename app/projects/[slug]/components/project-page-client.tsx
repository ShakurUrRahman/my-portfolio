"use client";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getData } from "@/lib/getData";
import Cursor from "@/app/components/cursor";
import ProjectLinks from "@/app/components/project/project-links";
import { ChallengesLearnings } from "@/app/components/project/challenges-learnings";
import KeyFeatures from "@/app/components/project/key-features";
import HowItWorks from "@/app/components/project/how-it-works";
import {
	ProjectMeta,
	ProjectTags,
	ProjectTitle,
} from "@/app/components/project/project-hero";
import StarsBackground from "./project-stars-background";
import PageImageArea from "./page-image-area";

// Animation variants
const pageVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const heroItemVariants = {
	hidden: {
		opacity: 0,
		y: 30,
		filter: "blur(10px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const navVariants = {
	hidden: { y: -100, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

// ── Animated Section wrapper ────────────────────────────────────────────────
function Section({
	label,
	children,
	card = false,
}: {
	label: string;
	children: React.ReactNode;
	card?: boolean;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<motion.div
			ref={ref}
			className="mb-10 sm:mb-12"
			initial={{ opacity: 0, y: 40 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
			transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
		>
			<div className="flex items-center gap-4 mb-5">
				<motion.p
					className="font-mono text-xs uppercase tracking-widest flex-shrink-0"
					style={{ color: "rgba(139,92,246,.5)" }}
					initial={{ opacity: 0, x: -20 }}
					animate={
						isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
					}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					{label}
				</motion.p>
				<motion.div
					className="flex-1 h-px"
					style={{
						background:
							"linear-gradient(to right, rgba(139,92,246,.2), transparent)",
						transformOrigin: "left",
					}}
					initial={{ scaleX: 0 }}
					animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				/>
			</div>
			{card ? (
				<motion.div
					className="rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
					style={{
						background: "rgba(139,92,246,.04)",
						border: "1px solid rgba(139,92,246,.12)",
					}}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={
						isInView
							? { opacity: 1, scale: 1 }
							: { opacity: 0, scale: 0.95 }
					}
					transition={{ duration: 0.6, delay: 0.3 }}
					whileHover={{ borderColor: "rgba(139,92,246,.25)" }}
				>
					{/* Glow effect */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
						<div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
					</div>
					<div className="relative z-10">{children}</div>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					{children}
				</motion.div>
			)}
		</motion.div>
	);
}

// ── Animated Nav Component ────────────────────────────────────────────────
function AnimatedNav() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.nav
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 100,
				background: scrolled ? "rgba(2,2,8,.95)" : "rgba(2,2,8,.85)",
				backdropFilter: "blur(20px)",
				borderBottom: "1px solid rgba(139,92,246,.1)",
				padding: "16px 28px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,.3)" : "none",
			}}
			variants={navVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
			</motion.div>
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<Link
					href="/"
					className="font-mono text-xs inline-flex items-center gap-2 no-underline px-4 py-2 rounded-lg transition-all duration-300"
					style={{
						color: "rgba(139,92,246,.8)",
						background: "rgba(139,92,246,.08)",
						border: "1px solid rgba(139,92,246,.2)",
					}}
				>
					← Back to Portfolio
				</Link>
			</motion.div>
		</motion.nav>
	);
}

// ── Main Page Component ────────────────────────────────────────────────
export default function ProjectPageClient({ project }: { project: any }) {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

	return (
		<div style={{ background: "rgb(2,2,8)", minHeight: "100vh" }}>
			<Cursor />
			<StarsBackground />
			<AnimatedNav />

			{/* ── Main ── */}
			<motion.main
				ref={containerRef}
				className="relative"
				style={{ zIndex: 1, paddingTop: 100 }}
				initial="hidden"
				animate="visible"
				variants={pageVariants}
			>
				<div
					className="mx-auto px-4 sm:px-6 md:px-10"
					style={{ maxWidth: 1260 }}
				>
					{/* Hero */}
					<motion.div
						className="text-center mb-10 sm:mb-14"
						style={{ opacity, scale }}
					>
						<motion.p
							className="font-mono text-xs uppercase tracking-widest mb-5"
							style={{ color: "rgba(139,92,246,.5)" }}
							variants={heroItemVariants}
						>
							Case Study
						</motion.p>

						<motion.div variants={heroItemVariants}>
							<ProjectTitle
								project={project}
								size="page"
								className="mb-5"
							/>
						</motion.div>

						<motion.div variants={heroItemVariants}>
							<ProjectMeta
								project={project}
								className="justify-center mb-5"
								opacity=".35"
								showDuration={true}
							/>
						</motion.div>

						<motion.div variants={heroItemVariants}>
							<ProjectTags
								project={project}
								className="justify-center mb-8"
							/>
						</motion.div>

						{(project.github || project.live) && (
							<motion.div variants={heroItemVariants}>
								<ProjectLinks
									github={project.github}
									live={project.live}
									className="flex gap-3 justify-center flex-wrap"
								/>
							</motion.div>
						)}
					</motion.div>

					{/* Preview images */}
					<Section label="Preview">
						<PageImageArea
							images={project.images}
							mobileHeight={220}
						/>
					</Section>

					{/* Overview */}
					{project.overview && (
						<Section label="Overview" card>
							<motion.p
								className="font-mono text-sm sm:text-base leading-loose"
								style={{ color: "rgba(200,190,240,.75)" }}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								{project.overview}
							</motion.p>
						</Section>
					)}

					{/* How It Works */}
					{project.howItWorks?.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.7 }}
						>
							<HowItWorks
								steps={project.howItWorks}
								variant="full"
								className="mb-12"
							/>
						</motion.div>
					)}

					{/* Key Features */}
					{project.features?.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.7 }}
						>
							<KeyFeatures
								features={project.features}
								gridClass="grid grid-cols-1 sm:grid-cols-2 gap-3"
							/>
						</motion.div>
					)}

					{/* Challenges & Learnings */}
					{(project.challenges?.length > 0 ||
						project.learnings?.length > 0) && (
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

					{/* Footer CTA */}
					<motion.div
						className="mt-10 mb-16 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden group"
						style={{
							background: "rgba(139,92,246,.06)",
							border: "1px solid rgba(139,92,246,.15)",
						}}
						initial={{ opacity: 0, y: 60, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						whileHover={{
							borderColor: "rgba(139,92,246,.3)",
							boxShadow: "0 10px 40px rgba(139,92,246,.2)",
						}}
					>
						{/* Glow effect */}
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
							<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl" />
						</div>

						<motion.p
							className="font-mono text-xs uppercase tracking-widest mb-3 relative z-10"
							style={{ color: "rgba(139,92,246,.5)" }}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
						>
							Like what you see?
						</motion.p>
						<motion.p
							className="font-syne font-bold text-white text-xl sm:text-2xl mb-6 relative z-10"
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3 }}
						>
							Let's work together
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4 }}
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link
									href="/?section=4"
									className="proj-filled font-mono text-xs rounded-xl no-underline inline-flex items-center gap-2 px-8 py-3 relative z-10"
								>
									Get in Touch →
								</Link>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</motion.main>
		</div>
	);
}
