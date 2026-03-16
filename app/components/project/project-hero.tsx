"use client";

import { StatusBadge } from "../drawer-subcomponents";

interface ProjectHeroProps {
	project: any;
	className?: string;
	titleSize?: string;
	metaOpacity?: string;
	showDuration?: boolean;
	tagClassName?: string;
}

export function ProjectTitle({
	project,
	className = "",
	size = "drawer",
}: {
	project: any;
	className?: string;
	size?: "drawer" | "page";
}) {
	const fontSize =
		size === "page" ? "clamp(32px,7vw,60px)" : "clamp(20px,5vw,38px)";
	const lineHeight = size === "page" ? 1.05 : 1.1;
	const letterSpacing = size === "page" ? "-0.03em" : "-0.02em";

	return (
		<h1
			className={`font-syne font-extrabold text-white ${className}`}
			style={{ fontSize, lineHeight, letterSpacing }}
		>
			{project.title}
		</h1>
	);
}

export function ProjectMeta({
	project,
	className = "",
	opacity = "0.4",
	showDuration = true,
}: {
	project: any;
	className?: string;
	opacity?: string;
	showDuration?: boolean;
}) {
	return (
		<div
			className={`flex flex-wrap items-center gap-2 sm:gap-2.5 ${className}`}
		>
			{project.status && <StatusBadge status={project.status} />}
			{project.year && (
				<span
					className="font-mono text-xs uppercase tracking-widest"
					style={{ color: `rgba(200,190,240,${opacity})` }}
				>
					{project.year}
				</span>
			)}
			{showDuration && project.duration && (
				<span
					className="font-mono text-xs"
					style={{ color: `rgba(200,190,240,${opacity})` }}
				>
					· {project.duration}
				</span>
			)}
			{project.role && (
				<span
					className="font-mono text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
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
	);
}

export function ProjectTags({
	project,
	className = "",
}: {
	project: any;
	className?: string;
}) {
	return (
		<div className={`flex flex-wrap gap-1.5 sm:gap-2 ${className}`}>
			{project.tags?.map((tag: string) => (
				<span key={tag} className="tag-badge">
					{tag}
				</span>
			))}
		</div>
	);
}
