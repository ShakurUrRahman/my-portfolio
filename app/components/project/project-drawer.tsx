"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, StatusBadge } from "../drawer-subcomponents";
import ImageCell from "../drawer-subcomponents/image-cell";
import CopyLinkButton from "../drawer-subcomponents/copy-link-button";
import Link from "next/link";
import ProjectLinks from "./project-links";
import { ChallengesLearnings } from "./challenges-learnings";
import KeyFeatures from "./key-features";
import HowItWorks from "./how-it-works";
import { ProjectMeta, ProjectTags, ProjectTitle } from "./project-hero";
import PageImageArea from "@/app/projects/[slug]/components/page-image-area";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.7),rgba(6,182,212,.5))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.5))",
	"linear-gradient(135deg,rgba(245,158,11,.5),rgba(139,92,246,.6))",
];

// Animation variants
const backdropVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.3 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.3 },
	},
};

const drawerVariants = {
	hidden: { x: "100%" },
	visible: {
		x: 0,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
	exit: {
		x: "100%",
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const contentVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		filter: "blur(5px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const headerItemVariants = {
	hidden: {
		opacity: 0,
		scale: 0.9,
	},
	visible: (i: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			delay: 0.2 + i * 0.05,
			duration: 0.4,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
};

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
		<AnimatePresence>
			{visible && (
				<>
					{/* Backdrop */}
					<motion.div
						onClick={close}
						className="fixed inset-0"
						style={{
							background: "rgba(0,0,0,.85)",
							zIndex: 990,
						}}
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					/>

					{/* Drawer panel */}
					<motion.div
						className="fixed top-0 right-0 h-full w-full overflow-y-auto"
						style={{
							maxWidth: 980,
							background: "rgb(5,3,18)",
							borderLeft: "1px solid rgba(139,92,246,.2)",
							zIndex: 991,
							scrollbarWidth: "thin",
							scrollbarColor: "rgba(139,92,246,.3) transparent",
						}}
						variants={drawerVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						{/* ── Sticky header ── */}
						<motion.div
							className="sticky top-0 z-10 flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-7 py-3 sm:py-[18px]"
							style={{
								background: "rgba(5,3,18,.95)",
								backdropFilter: "blur(16px)",
								borderBottom: "1px solid rgba(139,92,246,.12)",
							}}
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							<div className="flex items-center gap-2 sm:gap-3 min-w-0">
								<motion.span
									className="font-mono text-xs tracking-widest uppercase flex-shrink-0 hidden sm:block"
									style={{ color: "rgba(139,92,246,.5)" }}
									custom={0}
									variants={headerItemVariants}
									initial="hidden"
									animate="visible"
								>
									Project
								</motion.span>
								<motion.span
									className="flex-shrink-0 w-px h-3.5 hidden sm:block"
									style={{
										background: "rgba(139,92,246,.2)",
									}}
									custom={1}
									variants={headerItemVariants}
									initial="hidden"
									animate="visible"
								/>
								<motion.h1
									className="font-syne font-extrabold text-white truncate"
									style={{ fontSize: "clamp(13px,3vw,18px)" }}
									custom={2}
									variants={headerItemVariants}
									initial="hidden"
									animate="visible"
								>
									{project.title.split(/[-–—]/)[0].trim()}
								</motion.h1>
							</div>

							<div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
								<motion.div
									custom={3}
									variants={headerItemVariants}
									initial="hidden"
									animate="visible"
								>
									<CopyLinkButton
										projectSlug={project.slug}
									/>
								</motion.div>
								<motion.button
									onClick={close}
									className="flex items-center justify-center w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg text-sm sm:text-base cursor-pointer"
									style={{
										background: "rgba(139,92,246,.1)",
										border: "1px solid rgba(139,92,246,.25)",
										color: "rgba(139,92,246,.8)",
									}}
									custom={4}
									variants={headerItemVariants}
									initial="hidden"
									animate="visible"
									whileHover={{
										scale: 1.1,
										backgroundColor: "rgba(139,92,246,.2)",
										rotate: 90,
									}}
									whileTap={{ scale: 0.9 }}
									transition={{ duration: 0.2 }}
								>
									✕
								</motion.button>
							</div>
						</motion.div>

						{/* ── Body ── */}
						<motion.div
							className="px-7 pt-8 pb-16"
							variants={contentVariants}
							initial="hidden"
							animate="visible"
						>
							{/* Title + meta */}
							<motion.div
								className="mb-5 sm:mb-7 text-center px-2 sm:px-0"
								variants={itemVariants}
							>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4, duration: 0.5 }}
								>
									<ProjectTitle
										project={project}
										size="drawer"
										className="mb-2.5 sm:mb-3.5"
									/>
								</motion.div>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5, duration: 0.5 }}
								>
									<ProjectMeta
										project={project}
										className="justify-center mb-3 sm:mb-4"
										opacity=".4"
									/>
								</motion.div>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.6, duration: 0.5 }}
								>
									<ProjectTags
										project={project}
										className="justify-center"
									/>
								</motion.div>
							</motion.div>

							{/* 3-image grid */}
							<motion.div variants={itemVariants}>
								<Section label="Preview">
									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											delay: 0.7,
											duration: 0.6,
										}}
									>
										<PageImageArea
											images={project.images}
											className="mb-4 sm:mb-9"
											mobileHeight={150}
										/>
									</motion.div>
								</Section>
							</motion.div>

							{/* Overview */}
							{project.overview && (
								<motion.div variants={itemVariants}>
									<Section label="Overview">
										<motion.p
											className="font-mono text-sm leading-loose"
											style={{
												color: "rgba(200,190,240,.75)",
											}}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{
												delay: 0.8,
												duration: 0.5,
											}}
										>
											{project.overview}
										</motion.p>
									</Section>
								</motion.div>
							)}

							{/* How It Works */}
							{project.howItWorks?.length > 0 && (
								<motion.div variants={itemVariants}>
									<HowItWorks steps={project.howItWorks} />
								</motion.div>
							)}

							{/* Key Features */}
							{project.features?.length > 0 && (
								<motion.div variants={itemVariants}>
									<KeyFeatures
										features={project.features}
										gridClass="grid gap-2.5"
										gridStyle={{
											gridTemplateColumns:
												"repeat(auto-fill,minmax(200px,1fr))",
										}}
									/>
								</motion.div>
							)}

							{/* Challenges & Learnings */}
							{(project.challenges?.length > 0 ||
								project.learnings?.length > 0) && (
								<motion.div variants={itemVariants}>
									<ChallengesLearnings
										challenges={project.challenges}
										learnings={project.learnings}
										wrapperClassName="flex flex-col sm:flex-row gap-3 mb-7"
										cardClassName="rounded-xl p-5"
										textSize="text-xs"
									/>
								</motion.div>
							)}

							{/* Links */}
							{(project.github || project.live) && (
								<motion.div
									variants={itemVariants}
									whileInView={{ opacity: 1, y: 0 }}
									initial={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.5 }}
								>
									<ProjectLinks
										github={project.github}
										live={project.live}
										className="flex gap-3 flex-wrap"
									/>
								</motion.div>
							)}

							{/* Floating particles effect */}
							<motion.div
								className="fixed top-20 right-10 w-2 h-2 rounded-full pointer-events-none"
								style={{ background: "rgba(139,92,246,.4)" }}
								animate={{
									y: [0, -30, 0],
									opacity: [0.4, 0.8, 0.4],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
							<motion.div
								className="fixed bottom-40 right-20 w-1.5 h-1.5 rounded-full pointer-events-none"
								style={{ background: "rgba(6,182,212,.4)" }}
								animate={{
									y: [0, 20, 0],
									opacity: [0.3, 0.7, 0.3],
								}}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1,
								}}
							/>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
