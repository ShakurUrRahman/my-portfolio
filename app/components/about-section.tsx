"use client";

import Link from "next/link";
import { Glass, SectionTitle } from ".";
import SkillBar from "./skill-bar";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ── Map skill names to SVG icons ──
const SKILL_ICONS: Record<string, JSX.Element> = {
	// ... (keep all your existing icons)
	javascript: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<rect x="2" y="2" width="20" height="20" rx="3" />
			<text x="5" y="17" fontSize="10" fontWeight="bold" fill="#020208">
				JS
			</text>
		</svg>
	),
	react: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			width="18"
			height="18"
		>
			<circle cx="12" cy="12" r="2.5" />
			<ellipse cx="12" cy="12" rx="10" ry="4" />
			<ellipse
				cx="12"
				cy="12"
				rx="10"
				ry="4"
				transform="rotate(60 12 12)"
			/>
			<ellipse
				cx="12"
				cy="12"
				rx="10"
				ry="4"
				transform="rotate(120 12 12)"
			/>
		</svg>
	),
	next: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
		</svg>
	),
	typescript: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<rect x="2" y="2" width="20" height="20" rx="3" />
			<text x="5" y="17" fontSize="10" fontWeight="bold" fill="#020208">
				TS
			</text>
		</svg>
	),
	node: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3l7.5 3.75-7.5 3.75L4.5 8.05 12 4.3zM4 9.5l7 3.5v6.7L4 16.2V9.5zm9 10.2v-6.7l7-3.5v6.7l-7 3.5z" />
		</svg>
	),
	tailwind: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.4 11 14.6 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.6 7 14.4 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.4 17 9.6 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.6 13 9.4 12 7 12z" />
		</svg>
	),
	css: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M3 2l1.5 17L12 21l7.5-2L21 2H3zm14.5 5H7l.3 3h9.9l-.9 9-4.3 1.2L7.7 19l-.3-3h2.5l.2 1.7 1.9.5 1.9-.5.2-2.2H7.2L6.5 7z" />
		</svg>
	),
	express: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
		</svg>
	),
	postgresql: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			width="18"
			height="18"
		>
			<ellipse cx="12" cy="6" rx="8" ry="3" />
			<path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
			<path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
		</svg>
	),
	mongodb: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M12 2C8 2 6 6 6 10c0 3.5 2 6 6 12 4-6 6-8.5 6-12 0-4-2-8-6-8zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
		</svg>
	),
	mysql: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			width="18"
			height="18"
		>
			<ellipse cx="12" cy="6" rx="8" ry="3" />
			<path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
			<path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
		</svg>
	),
	three: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			width="18"
			height="18"
		>
			<path d="M12 3L2 19h20L12 3z" />
			<path d="M7 19l5-8 5 8" />
		</svg>
	),
	webgl: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			width="18"
			height="18"
		>
			<rect x="3" y="3" width="18" height="18" rx="2" />
			<path d="M7 8l-3 8M7 8l3 8 2-5 2 5 3-8M17 8l3 8" />
		</svg>
	),
	python: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M12 2C9 2 7 3.5 7 5.5V8h5v1H5.5C3.5 9 2 11 2 13.5S3.5 18 5.5 18H7v-2.5c0-2 2-3.5 5-3.5s5 1.5 5 3.5V21c0 .6-.4 1-1 1H10c-.6 0-1-.4-1-1v-.5H7V21c0 1.7 1.3 3 3 3h4c1.7 0 3-1.3 3-3v-3h1.5c2 0 3.5-2 3.5-4.5S20.5 9 18.5 9H17V6.5C17 3.5 15 2 12 2zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 14a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
		</svg>
	),
	git: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M23.5 11.5l-11-11a1.7 1.7 0 0 0-2.4 0l-2.4 2.4 3 3a2 2 0 0 1 2.6 2.6l3 3a2 2 0 1 1-1.2 1.2l-2.8-2.8v7.1a2 2 0 1 1-1.6 0V9.7a2 2 0 0 1-1.1-2.6L7.2 4 .5 10.6a1.7 1.7 0 0 0 0 2.4l11 11a1.7 1.7 0 0 0 2.4 0l9.6-9.6a1.7 1.7 0 0 0 0-2.4z" />
		</svg>
	),
	docker: (
		<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
			<path d="M22 11.5c-.3-.2-1-.4-2-.3-.1-.8-.7-1.6-1.3-2l-.3-.2-.2.3c-.4.5-.5 1.4-.4 2-.3-.1-.5-.3-.8-.5-.4-.3-.7-.8-.9-1.3l-.1-.4-.4.2c-.4.2-1 .7-1 1.8H3c0 3.3 2.5 6 5.8 6.4a10 10 0 0 0 5.5-.5c1.1-.4 2-1 2.7-1.8.9.1 2 .1 2.7-.5.7-.6 1-1.7.8-2.7l-.1-.3-.4-.2z" />
			<path d="M5 11H3v2h2v-2zm3 0H6v2h2v-2zm3 0H9v2h2v-2zm3 0h-2v2h2v-2zm-6-3H6v2h2V8zm3 0H9v2h2V8zm3 0h-2v2h2V8zm0-3h-2v2h2V5z" />
		</svg>
	),
	default: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			width="18"
			height="18"
		>
			<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
		</svg>
	),
};

function getSkillIcon(name: string) {
	const key = name.toLowerCase();
	for (const [k, icon] of Object.entries(SKILL_ICONS)) {
		if (key.includes(k)) return icon;
	}
	return SKILL_ICONS["default"];
}

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.1,
		},
	},
};

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 60,
		scale: 0.95,
		filter: "blur(10px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		filter: "blur(0px)",
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const imageVariants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
		rotate: -10,
	},
	visible: {
		opacity: 0.65,
		scale: 1,
		rotate: 0,
		transition: {
			duration: 1,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const skillVariants = {
	hidden: {
		opacity: 0,
		x: -30,
		scale: 0.9,
	},
	visible: (i) => ({
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			delay: i * 0.1,
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
};

const iconVariants = {
	hidden: { scale: 0, rotate: -180 },
	visible: {
		scale: 1,
		rotate: 0,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 15,
		},
	},
};

export default function AboutSection({ data }) {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		amount: 0.3, // Trigger when 30% of section is visible
		margin: "0px -200px 0px 0px", // Trigger earlier for horizontal scroll
	});

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
				<SectionTitle label="001" title="About Me" />
			</motion.div>

			<motion.div
				className="grid grid-cols-1 lg:grid-cols-2 items-start gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12"
				variants={containerVariants}
			>
				{/* Bio card */}
				<motion.div variants={cardVariants}>
					<Glass
						hover
						className="p-6 sm:p-8 md:p-10 relative overflow-hidden group"
					>
						{/* Subtle glow effect on hover */}
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
							<div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
							<div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
						</div>

						<motion.div
							variants={imageVariants}
							whileHover={{
								opacity: 0.95,
								scale: 1.05,
								rotate: 2,
								transition: { duration: 0.3 },
							}}
						>
							<Image
								width={190}
								height={190}
								src="/my-image.png"
								alt="Shakurur Rahman"
								className="block mx-auto mb-4 sm:float-right sm:ml-3 sm:mb-3 sm:mx-0 border-4 rounded-xl object-cover transition-all duration-500 ease-out relative z-10"
								style={{
									background: "transparent",
									border: "3px solid rgba(139, 92, 246, 0.3)",
								}}
							/>
						</motion.div>

						<motion.h3
							className="font-syne font-bold text-white text-lg sm:text-xl md:text-2xl mb-2 relative z-10"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { delay: 0.3, duration: 0.6 },
								},
							}}
						>
							{data.about.name}
						</motion.h3>

						<motion.p
							className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-4 relative z-10"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { delay: 0.4, duration: 0.6 },
								},
							}}
						>
							{data.about.role}
						</motion.p>

						<motion.p
							className="font-mono text-xs sm:text-sm leading-loose whitespace-pre-wrap text-justify relative z-10"
							style={{ color: "rgba(200,190,240,.7)" }}
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { delay: 0.5, duration: 0.8 },
								},
							}}
						>
							{data.about.bio}
						</motion.p>

						{/* Clear float */}
						<div className="clear-both" />
					</Glass>
				</motion.div>

				{/* Skills card */}
				<motion.div
					className="p-6 sm:p-8 md:p-10 rounded-2xl glass-hover relative overflow-hidden group"
					style={{ border: "1px solid rgba(139, 92, 246, 0.3)" }}
					variants={cardVariants}
				>
					{/* Glow effect */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
						<div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
						<div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
					</div>

					<motion.h4
						className="font-syne font-bold text-white text-base sm:text-lg mb-5 md:mb-7 relative z-10"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: {
								opacity: 1,
								y: 0,
								transition: { delay: 0.2, duration: 0.6 },
							},
						}}
					>
						Skills & Technologies
					</motion.h4>

					<div className="flex flex-col gap-4 sm:gap-5 relative z-10">
						{data.about.skills
							.filter((s) => !s.hidden)
							.map((s, i) => (
								<motion.div
									key={s.name}
									className="flex items-center gap-3 sm:gap-4 group/skill"
									custom={i}
									variants={skillVariants}
								>
									{/* Icon with animation */}
									<motion.div
										className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center relative"
										style={{
											background: "rgba(139,92,246,.1)",
											border: "1px solid rgba(139,92,246,.2)",
											color: "rgba(139,92,246,.85)",
										}}
										variants={iconVariants}
										whileHover={{
											scale: 1.1,
											rotate: 360,
											background: "rgba(139,92,246,.2)",
											transition: {
												rotate: { duration: 0.6 },
												scale: { duration: 0.2 },
											},
										}}
									>
										{getSkillIcon(s.name)}

										{/* Glow on hover */}
										<motion.div
											className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover/skill:opacity-50 transition-opacity duration-300 pointer-events-none"
											style={{
												background:
													"rgba(139,92,246,.5)",
											}}
										/>
									</motion.div>

									{/* Skill bar with enhanced animation */}
									<div className="flex-1">
										<SkillBar
											{...s}
											index={i}
											animated={isInView}
										/>
									</div>
								</motion.div>
							))}
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
