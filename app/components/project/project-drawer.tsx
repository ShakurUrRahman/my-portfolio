"use client";

import { useEffect, useState, useCallback } from "react";
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

export default function ProjectDrawer({
	project,
	onClose,
}: {
	project: any;
	onClose: () => void;
}) {
	const [visible, setVisible] = useState(false);
	// console.log(project.title);

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
				className="fixed top-0 right-0 h-full w-full overflow-y-auto "
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
					className="sticky top-0 z-10 flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-7 py-3 sm:py-[18px]"
					style={{
						background: "rgba(5,3,18,.95)",
						backdropFilter: "blur(16px)",
						borderBottom: "1px solid rgba(139,92,246,.12)",
					}}
				>
					<div className="flex items-center gap-2 sm:gap-3 min-w-0">
						<span
							className="font-mono text-xs tracking-widest uppercase flex-shrink-0 hidden sm:block"
							style={{ color: "rgba(139,92,246,.5)" }}
						>
							Project
						</span>
						<span
							className="flex-shrink-0 w-px h-3.5 hidden sm:block"
							style={{ background: "rgba(139,92,246,.2)" }}
						/>
						<h1
							className="font-syne font-extrabold text-white truncate"
							style={{ fontSize: "clamp(13px,3vw,18px)" }}
						>
							{project.title.split(/[-–—]/)[0].trim()}
						</h1>
					</div>

					<div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
						<CopyLinkButton projectSlug={project.slug} />
						<button
							onClick={close}
							className="flex items-center justify-center w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg text-sm sm:text-base cursor-pointer"
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
					<div className="mb-5 sm:mb-7 text-center px-2 sm:px-0">
						<ProjectTitle
							project={project}
							size="drawer"
							className="mb-2.5 sm:mb-3.5"
						/>
						<ProjectMeta
							project={project}
							className="justify-center mb-3 sm:mb-4"
							opacity=".4"
							showDuration={false}
						/>
						<ProjectTags
							project={project}
							className="justify-center"
						/>
					</div>

					{/* 3-image grid */}
					<Section label="Preview">
						<PageImageArea
							images={project.images}
							className="mb-4 sm:mb-9"
							mobileHeight={150}
						/>
					</Section>

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
						<HowItWorks steps={project.howItWorks} />
					)}

					{/* Key Features */}
					{project.features?.length > 0 && (
						<KeyFeatures
							features={project.features}
							gridClass="grid gap-2.5"
							gridStyle={{
								gridTemplateColumns:
									"repeat(auto-fill,minmax(200px,1fr))",
							}}
						/>
					)}

					{/* Challenges & Learnings */}
					{(project.challenges?.length > 0 ||
						project.learnings?.length > 0) && (
						<ChallengesLearnings
							challenges={project.challenges}
							learnings={project.learnings}
							wrapperClassName="flex flex-col sm:flex-row gap-3 mb-7"
							cardClassName="rounded-xl p-5"
							textSize="text-xs"
						/>
					)}

					{/* Links */}

					{(project.github || project.live) && (
						<ProjectLinks
							github={project.github}
							live={project.live}
							className="flex gap-3 flex-wrap"
						/>
					)}
				</div>
			</div>
		</>
	);
}
