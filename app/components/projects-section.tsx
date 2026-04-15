"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from ".";
import ProjectDrawer from "./project/project-drawer";
import Link from "next/link";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.6))",
	"linear-gradient(135deg,rgba(245,158,11,.6),rgba(139,92,246,.6))",
];
const EMOJIS = ["🚀", "✨", "📊", "🎯", "⚡", "🌊"];

function StatusDot({ status }: { status?: string }) {
	if (!status) return null;
	const label = status === true ? "Completed" : String(status);
	const ok = label === "Completed";
	return (
		<motion.span
			className="font-mono text-xs px-2 py-0.5 rounded-full"
			style={{
				background: ok
					? "rgba(16,185,129,.12)"
					: "rgba(245,158,11,.12)",
				border: `1px solid ${ok ? "rgba(16,185,129,.3)" : "rgba(245,158,11,.3)"}`,
				color: ok ? "#10b981" : "#f59e0b",
				fontSize: 10,
			}}
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				type: "spring",
				stiffness: 200,
				delay: 0.3,
			}}
		>
			{ok ? "● " : "◌ "}
		</motion.span>
	);
}

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 60,
		scale: 0.9,
		rotateX: -15,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		rotateX: 0,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const thumbnailVariants = {
	hidden: { scale: 1.2, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const tagVariants = {
	hidden: { scale: 0, opacity: 0 },
	visible: (i: number) => ({
		scale: 1,
		opacity: 1,
		transition: {
			delay: i * 0.05,
			type: "spring",
			stiffness: 200,
			damping: 15,
		},
	}),
};

export default function ProjectsSection({ data }: { data: any }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const visible = data.projects.filter((p: any) => p.visible);

	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		amount: 0.2,
		margin: "0px -200px 0px 0px",
	});

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
		<motion.div
			ref={ref}
			className="min-h-screen
        pt-24 sm:pt-28 md:pt-32 lg:pt-36
        pb-12 sm:pb-16 md:pb-20
        px-4 sm:px-6 md:px-10
        max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl
        mx-auto"
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={containerVariants}
		>
			<motion.div variants={cardVariants}>
				<SectionTitle label="002" title="Projects" />
			</motion.div>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
          gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12"
				variants={containerVariants}
			>
				{visible.map((p: any, i: number) => (
					<motion.div
						key={p.id}
						className="glass glass-hover p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 h-full relative group overflow-hidden"
						style={{ cursor: "pointer" }}
						onClick={() => openProject(p)}
						variants={cardVariants}
						whileHover={{
							y: -8,
							transition: { duration: 0.3 },
						}}
						whileTap={{ scale: 0.98 }}
					>
						{/* Glow effect on hover */}
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
							<div
								className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
								style={{
									background: GRADIENTS[i % GRADIENTS.length],
								}}
							/>
						</div>

						{/* Thumbnail */}
						<div
							className="h-32 sm:h-36 md:h-40 rounded-xl flex items-center justify-center text-4xl sm:text-5xl overflow-hidden mb-1 sm:mb-2 relative"
							style={{
								background: GRADIENTS[i % GRADIENTS.length],
							}}
						>
							<motion.div
								className="w-full h-full"
								variants={thumbnailVariants}
							>
								{p.thumbnail || p.images?.[0] ? (
									<motion.img
										src={p.thumbnail || p.images?.[0]}
										alt={p.title}
										className="w-full h-full object-cover object-center"
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.6 }}
									/>
								) : (
									<motion.div
										className="w-full h-full flex items-center justify-center"
										animate={{
											rotate: [0, 5, -5, 0],
										}}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: "easeInOut",
										}}
									>
										{EMOJIS[i % EMOJIS.length]}
									</motion.div>
								)}
							</motion.div>

							{/* Hover overlay */}
							<motion.div
								className="project-overlay absolute inset-0 flex items-center justify-center"
								style={{
									background: "rgba(5,3,18,.75)",
									borderRadius: 12,
								}}
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
								transition={{ duration: 0.25 }}
							>
								<motion.span
									className="font-mono text-xs uppercase tracking-widest text-white"
									style={{
										background: "rgba(139,92,246,.25)",
										border: "1px solid rgba(139,92,246,.5)",
										borderRadius: 8,
										padding: "8px 16px",
									}}
									initial={{ y: 10, opacity: 0 }}
									whileHover={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.1 }}
								>
									View Details →
								</motion.span>
							</motion.div>
						</div>

						{/* Title + status */}
						<div className="flex items-start justify-between gap-2 relative z-10">
							<motion.h3
								className="font-syne font-bold text-white text-base sm:text-lg md:text-xl"
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 }}
							>
								{p.title}
							</motion.h3>
							{p.status && <StatusDot status={p.status} />}
						</div>

						<motion.p
							className="font-mono text-xs leading-loose relative z-10"
							style={{ color: "rgba(200,190,240,.65)" }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							{p.description}
						</motion.p>

						{/* Meta */}
						{(p.role || p.year) && (
							<motion.div
								className="flex gap-3 items-center relative z-10"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.35 }}
							>
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
										({p.year})
									</span>
								)}
							</motion.div>
						)}

						{/* Tags */}
						<div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
							{p.tags?.map((tag: string, idx: number) => (
								<motion.span
									key={tag}
									className="tag-badge"
									custom={idx}
									variants={tagVariants}
									whileHover={{
										scale: 1.1,
										backgroundColor: "rgba(139,92,246,.2)",
									}}
								>
									{tag}
								</motion.span>
							))}
						</div>

						{/* Links */}
						<motion.div
							className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-2 relative z-10"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{p.github && (
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link
										href={p.github}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="proj-ghost font-mono text-xs rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 no-underline inline-block"
									>
										⌥ GitHub
									</Link>
								</motion.div>
							)}
							{p.live && (
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link
										href={p.live}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="proj-filled font-mono text-xs rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 no-underline inline-block"
									>
										↗ Live
									</Link>
								</motion.div>
							)}
						</motion.div>

						{/* Shine effect on hover */}
						<div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
							<motion.div
								className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
								initial={false}
								whileHover={{
									left: "100%",
									transition: {
										duration: 0.6,
										ease: "easeInOut",
									},
								}}
							/>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Drawer */}
			{selected && (
				<ProjectDrawer project={selected} onClose={closeProject} />
			)}
		</motion.div>
	);
}
