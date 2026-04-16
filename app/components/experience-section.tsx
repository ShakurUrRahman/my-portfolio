"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from ".";

const TYPE_STYLES: Record<
	string,
	{ bg: string; border: string; color: string }
> = {
	"Full-time": {
		bg: "rgba(139,92,246,.1)",
		border: "rgba(139,92,246,.25)",
		color: "rgba(139,92,246,.9)",
	},
	Freelance: {
		bg: "rgba(6,182,212,.1)",
		border: "rgba(6,182,212,.25)",
		color: "rgba(6,182,212,.9)",
	},
	Internship: {
		bg: "rgba(16,185,129,.1)",
		border: "rgba(16,185,129,.25)",
		color: "rgba(16,185,129,.9)",
	},
	"Part-time": {
		bg: "rgba(245,158,11,.1)",
		border: "rgba(245,158,11,.25)",
		color: "rgba(245,158,11,.9)",
	},
};

function TypeBadge({ type }: { type?: string }) {
	if (!type) return null;
	const s = TYPE_STYLES[type] ?? TYPE_STYLES["Full-time"];
	return (
		<motion.span
			className="font-mono text-xs px-2.5 py-0.5 rounded-full flex-shrink-0"
			style={{
				background: s.bg,
				border: `1px solid ${s.border}`,
				color: s.color,
			}}
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				type: "spring",
				stiffness: 200,
				delay: 0.3,
			}}
		>
			{type}
		</motion.span>
	);
}

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.2,
		},
	},
};

const timelineItemVariants = {
	hidden: {
		opacity: 0,
		x: -60,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			duration: 0.7,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const dotVariants = {
	hidden: {
		scale: 0,
		opacity: 0,
	},
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 15,
		},
	},
};

const achievementVariants = {
	hidden: {
		opacity: 0,
		x: -20,
	},
	visible: (i: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			delay: i * 0.1,
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
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

export default function ExperienceSection({ data }: { data: any }) {
	const experiences: any[] = data.experience ?? [];
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		amount: 0.1, // Trigger when just 10% is visible (safer for mobile)
		margin: "-10% 0px -10% 0px", // Use a small vertical offset instead
	});

	return (
		<motion.div
			ref={ref}
			className="min-h-screen
			pt-24 sm:pt-28 md:pt-32 lg:pt-36
			pb-12 sm:pb-16 md:pb-20
			px-4 sm:px-6 md:px-10
			max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
			mx-auto"
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={containerVariants}
		>
			<motion.div variants={timelineItemVariants}>
				<SectionTitle label="003" title="Experience & Education" />
			</motion.div>

			{experiences.length === 0 ? (
				<motion.p
					className="font-mono text-xs mt-12"
					style={{ color: "rgba(200,190,240,.3)" }}
					variants={timelineItemVariants}
				>
					No experience entries yet.
				</motion.p>
			) : (
				<div className="relative mt-10 sm:mt-12 md:mt-14">
					{/* Vertical timeline line with draw animation */}
					<motion.div
						className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px hidden sm:block"
						style={{
							background:
								"linear-gradient(to bottom, rgba(139,92,246,.4), rgba(139,92,246,.05))",
							transformOrigin: "top",
						}}
						initial={{ scaleY: 0 }}
						animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
						transition={{
							duration: 1.5,
							ease: [0.22, 1, 0.36, 1],
							delay: 0.3,
						}}
					/>

					<motion.div
						className="flex flex-col gap-8 sm:gap-10 md:gap-12"
						variants={containerVariants}
					>
						{experiences.map((exp, i) => (
							<motion.div
								key={exp.id ?? i}
								className="flex gap-5 sm:gap-8 group"
								variants={timelineItemVariants}
							>
								{/* Timeline dot */}
								<div
									className="flex-shrink-0 hidden sm:flex flex-col items-center"
									style={{ paddingTop: 4 }}
								>
									<motion.div
										className="w-[18px] h-[18px] rounded-full border-2 transition-all duration-300 group-hover:scale-125 relative"
										style={{
											background: exp.current
												? "rgba(139,92,246,.9)"
												: "rgba(5,3,18,1)",
											borderColor: exp.current
												? "rgba(139,92,246,.9)"
												: "rgba(139,92,246,.35)",
											boxShadow: exp.current
												? "0 0 12px rgba(139,92,246,.4)"
												: "none",
										}}
										variants={dotVariants}
										whileHover={{
											scale: 1.3,
											boxShadow:
												"0 0 20px rgba(139,92,246,.6)",
										}}
									>
										{/* Pulse effect for current position */}
										{exp.current && (
											<motion.div
												className="absolute inset-0 rounded-full"
												style={{
													background:
														"rgba(139,92,246,.4)",
												}}
												animate={{
													scale: [1, 1.5, 1],
													opacity: [0.5, 0, 0.5],
												}}
												transition={{
													duration: 2,
													repeat: Infinity,
													ease: "easeInOut",
												}}
											/>
										)}
									</motion.div>
								</div>

								{/* Card */}
								<motion.div
									className="flex-1 rounded-2xl p-5 sm:p-6 md:p-7 transition-all duration-300 group-hover:border-purple-500/30 relative overflow-hidden"
									style={{
										background: "rgba(139,92,246,.04)",
										border: "1px solid rgba(139,92,246,.12)",
									}}
									whileHover={{
										y: -4,
										boxShadow:
											"0 10px 30px rgba(139,92,246,.15)",
									}}
								>
									{/* Glow effect on hover */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
										<div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
										<div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
									</div>

									{/* Header row */}
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 relative z-10">
										<div className="min-w-0">
											<div className="flex items-center gap-2.5 flex-wrap mb-1">
												<motion.h3
													className="font-syne font-bold text-white text-base sm:text-lg"
													initial={{
														opacity: 0,
														y: 10,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													transition={{ delay: 0.2 }}
												>
													{exp.role}
												</motion.h3>
												{exp.current && (
													<motion.span
														className="font-mono text-xs px-2 py-0.5 rounded-full flex items-center gap-1.5"
														style={{
															background:
																"rgba(16,185,129,.1)",
															border: "1px solid rgba(16,185,129,.25)",
															color: "rgba(16,185,129,.9)",
														}}
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{
															type: "spring",
															stiffness: 200,
															delay: 0.4,
														}}
													>
														<motion.span
															className="inline-block w-1.5 h-1.5 rounded-full"
															style={{
																background:
																	"#10b981",
																boxShadow:
																	"0 0 6px #10b981",
															}}
															animate={{
																scale: [
																	1, 1.2, 1,
																],
																opacity: [
																	1, 0.8, 1,
																],
															}}
															transition={{
																duration: 2,
																repeat: Infinity,
																ease: "easeInOut",
															}}
														/>
														Current
													</motion.span>
												)}
											</div>
											<motion.p
												className="font-mono text-sm"
												style={{
													color: "rgba(6,182,212,.8)",
												}}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.3 }}
											>
												{exp.company}
											</motion.p>
										</div>

										<div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
											<TypeBadge type={exp.type} />
											<motion.span
												className="font-mono text-xs"
												style={{
													color: "rgba(200,190,240,.35)",
												}}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.4 }}
											>
												{exp.duration}
											</motion.span>
										</div>
									</div>

									{/* Location */}
									{exp.location && (
										<motion.p
											className="font-mono text-xs mb-3 relative z-10"
											style={{
												color: "rgba(200,190,240,.35)",
											}}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.35 }}
										>
											📍 {exp.location}
										</motion.p>
									)}

									{/* Description */}
									{exp.description && (
										<motion.p
											className="font-mono text-xs sm:text-sm leading-loose mb-4 whitespace-pre-wrap relative z-10"
											style={{
												color: "rgba(200,190,240,.65)",
											}}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: 0.4 }}
										>
											{exp.description}
										</motion.p>
									)}

									{/* Achievements */}
									{exp.achievements?.length > 0 && (
										<motion.ul
											className="flex flex-col gap-2 mb-4 relative z-10"
											initial="hidden"
											animate="visible"
											variants={containerVariants}
										>
											{exp.achievements.map(
												(a: string, j: number) => (
													<motion.li
														key={j}
														className="flex items-start gap-2.5"
														custom={j}
														variants={
															achievementVariants
														}
													>
														<span
															className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
															style={{
																background:
																	"rgba(139,92,246,.7)",
															}}
														/>
														<span
															className="font-mono text-xs leading-loose"
															style={{
																color: "rgba(200,190,240,.6)",
															}}
														>
															{a}
														</span>
													</motion.li>
												),
											)}
										</motion.ul>
									)}

									{/* Tech tags */}
									{exp.tags?.length > 0 && (
										<div className="flex flex-wrap gap-1.5 mt-3 relative z-10">
											{exp.tags.map(
												(tag: string, idx: number) => (
													<motion.span
														key={tag}
														className="tag-badge"
														custom={idx}
														variants={tagVariants}
														whileHover={{
															scale: 1.1,
															backgroundColor:
																"rgba(139,92,246,.2)",
														}}
													>
														{tag}
													</motion.span>
												),
											)}
										</div>
									)}
								</motion.div>
							</motion.div>
						))}
					</motion.div>
				</div>
			)}

			{/* Education Section */}
			<motion.div className="mt-10" variants={timelineItemVariants}>
				{/* Sub-header */}
				<div className="flex items-center gap-4 mb-6 sm:mb-8">
					<motion.h2
						className="font-syne font-bold text-xl sm:text-2xl text-white/90"
						initial={{ opacity: 0, x: -20 }}
						animate={
							isInView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -20 }
						}
						transition={{ delay: 0.8, duration: 0.6 }}
					>
						Education
					</motion.h2>
					<motion.div
						className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent"
						initial={{ scaleX: 0 }}
						animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
						transition={{ delay: 0.9, duration: 0.8 }}
						style={{ transformOrigin: "left" }}
					/>
				</div>

				<div className="relative">
					{/* Timeline line */}
					<motion.div
						className="absolute left-[7px] sm:left-[9px] top-0 bottom-2 w-px hidden sm:block"
						style={{
							background:
								"linear-gradient(to bottom, rgba(139,92,246,.15), rgba(139,92,246,.3), rgba(139,92,246,.05))",
							transformOrigin: "top",
						}}
						initial={{ scaleY: 0 }}
						animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
						transition={{
							duration: 1,
							ease: [0.22, 1, 0.36, 1],
							delay: 1,
						}}
					/>

					<motion.div
						className="flex flex-col gap-8"
						variants={timelineItemVariants}
					>
						<motion.div
							className="flex gap-5 sm:gap-8 group"
							initial={{ opacity: 0, x: -60 }}
							animate={
								isInView
									? { opacity: 1, x: 0 }
									: { opacity: 0, x: -60 }
							}
							transition={{ delay: 1.1, duration: 0.7 }}
						>
							{/* Timeline dot */}
							<div
								className="flex-shrink-0 hidden sm:flex flex-col items-center"
								style={{ paddingTop: 4 }}
							>
								<motion.div
									className="w-[18px] h-[18px] rounded-full border-2 transition-all duration-300 group-hover:scale-125 bg-[#050312]"
									style={{
										borderColor: "rgba(139,92,246,.35)",
									}}
									initial={{ scale: 0 }}
									animate={
										isInView ? { scale: 1 } : { scale: 0 }
									}
									transition={{
										type: "spring",
										stiffness: 200,
										delay: 1.2,
									}}
									whileHover={{
										scale: 1.3,
										borderColor: "rgba(139,92,246,.6)",
									}}
								/>
							</div>

							{/* Education Card */}
							<motion.div
								className="flex-1 rounded-2xl p-5 sm:p-6 md:p-7 transition-all duration-300 group-hover:border-purple-500/30 relative overflow-hidden"
								style={{
									background: "rgba(139,92,246,.02)",
									border: "1px solid rgba(139,92,246,.1)",
								}}
								whileHover={{
									y: -4,
									boxShadow:
										"0 10px 30px rgba(139,92,246,.15)",
								}}
							>
								{/* Glow effect */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
									<div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
									<div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
								</div>

								<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 relative z-10">
									<div className="min-w-0">
										<motion.h3
											className="font-syne font-bold text-white text-base sm:text-lg mb-1"
											initial={{ opacity: 0, y: 10 }}
											animate={
												isInView
													? { opacity: 1, y: 0 }
													: { opacity: 0, y: 10 }
											}
											transition={{ delay: 1.3 }}
										>
											BSc in Electronics and
											Telecommunication Engineering
										</motion.h3>
										<motion.p
											className="font-mono text-sm"
											style={{
												color: "rgba(6,182,212,.8)",
											}}
											initial={{ opacity: 0 }}
											animate={
												isInView
													? { opacity: 1 }
													: { opacity: 0 }
											}
											transition={{ delay: 1.4 }}
										>
											University of Liberal Arts
											Bangladesh
										</motion.p>
									</div>

									<div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
										<motion.span
											className="font-mono text-xs"
											style={{
												color: "rgba(200,190,240,.35)",
											}}
											initial={{ opacity: 0 }}
											animate={
												isInView
													? { opacity: 1 }
													: { opacity: 0 }
											}
											transition={{ delay: 1.5 }}
										>
											2009 — 2014
										</motion.span>
									</div>
								</div>

								<motion.p
									className="font-mono text-xs mb-3 relative z-10"
									style={{
										color: "rgba(200,190,240,.35)",
									}}
									initial={{ opacity: 0, x: -10 }}
									animate={
										isInView
											? { opacity: 1, x: 0 }
											: { opacity: 0, x: -10 }
									}
									transition={{ delay: 1.45 }}
								>
									📍 Dhaka, Bangladesh
								</motion.p>

								<motion.p
									className="font-mono text-xs sm:text-sm leading-loose relative z-10"
									style={{
										color: "rgba(200,190,240,.65)",
									}}
									initial={{ opacity: 0 }}
									animate={
										isInView
											? { opacity: 1 }
											: { opacity: 0 }
									}
									transition={{ delay: 1.5 }}
								>
									Developed a unique technical foundation by
									combining core communication engineering
									with the logic of system-level computing. I
									specialized in the intersection of hardware
									and data flow, focusing on how internal
									system structures interact with broader
									communication networks. This hybrid
									perspective allows me to build software with
									a deep appreciation for the underlying
									infrastructure and efficiency.
								</motion.p>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
}
