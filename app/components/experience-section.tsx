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
		<span
			className="font-mono text-xs px-2.5 py-0.5 rounded-full flex-shrink-0"
			style={{
				background: s.bg,
				border: `1px solid ${s.border}`,
				color: s.color,
			}}
		>
			{type}
		</span>
	);
}

export default function ExperienceSection({ data }: { data: any }) {
	const experiences: any[] = data.experience ?? [];

	return (
		<div
			className="min-h-screen
			pt-24 sm:pt-28 md:pt-32 lg:pt-36
			pb-12 sm:pb-16 md:pb-20
			px-4 sm:px-6 md:px-10
			max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
			mx-auto"
		>
			<SectionTitle label="003" title="Experience" />

			{experiences.length === 0 ? (
				<p
					className="font-mono text-xs mt-12"
					style={{ color: "rgba(200,190,240,.3)" }}
				>
					No experience entries yet.
				</p>
			) : (
				<div className="relative mt-10 sm:mt-12 md:mt-14">
					{/* Vertical timeline line */}
					<div
						className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px hidden sm:block"
						style={{
							background:
								"linear-gradient(to bottom, rgba(139,92,246,.4), rgba(139,92,246,.05))",
						}}
					/>

					<div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
						{experiences.map((exp, i) => (
							<div
								key={exp.id ?? i}
								className="flex gap-5 sm:gap-8 group"
							>
								{/* Timeline dot */}
								<div
									className="flex-shrink-0 hidden sm:flex flex-col items-center"
									style={{ paddingTop: 4 }}
								>
									<div
										className="w-[18px] h-[18px] rounded-full border-2 transition-all duration-300 group-hover:scale-125"
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
									/>
								</div>

								{/* Card */}
								<div
									className="flex-1 rounded-2xl p-5 sm:p-6 md:p-7 transition-all duration-300 group-hover:border-purple-500/30"
									style={{
										background: "rgba(139,92,246,.04)",
										border: "1px solid rgba(139,92,246,.12)",
									}}
								>
									{/* Header row */}
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
										<div className="min-w-0">
											<div className="flex items-center gap-2.5 flex-wrap mb-1">
												<h3 className="font-syne font-bold text-white text-base sm:text-lg">
													{exp.role}
												</h3>
												{exp.current && (
													<span
														className="font-mono text-xs px-2 py-0.5 rounded-full flex items-center gap-1.5"
														style={{
															background:
																"rgba(16,185,129,.1)",
															border: "1px solid rgba(16,185,129,.25)",
															color: "rgba(16,185,129,.9)",
														}}
													>
														<span
															className="inline-block w-1.5 h-1.5 rounded-full"
															style={{
																background:
																	"#10b981",
																boxShadow:
																	"0 0 6px #10b981",
															}}
														/>
														Current
													</span>
												)}
											</div>
											<p
												className="font-mono text-sm"
												style={{
													color: "rgba(6,182,212,.8)",
												}}
											>
												{exp.company}
											</p>
										</div>

										<div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
											<TypeBadge type={exp.type} />
											<span
												className="font-mono text-xs"
												style={{
													color: "rgba(200,190,240,.35)",
												}}
											>
												{exp.duration}
											</span>
										</div>
									</div>

									{/* Location */}
									{exp.location && (
										<p
											className="font-mono text-xs mb-3"
											style={{
												color: "rgba(200,190,240,.35)",
											}}
										>
											📍 {exp.location}
										</p>
									)}

									{/* Description */}
									{exp.description && (
										<p
											className="font-mono text-xs sm:text-sm leading-loose mb-4 whitespace-pre-wrap"
											style={{
												color: "rgba(200,190,240,.65)",
											}}
										>
											{exp.description}
										</p>
									)}

									{/* Achievements */}
									{exp.achievements?.length > 0 && (
										<ul className="flex flex-col gap-2 mb-4">
											{exp.achievements.map(
												(a: string, j: number) => (
													<li
														key={j}
														className="flex items-start gap-2.5"
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
													</li>
												),
											)}
										</ul>
									)}

									{/* Tech tags */}
									{exp.tags?.length > 0 && (
										<div className="flex flex-wrap gap-1.5 mt-3">
											{exp.tags.map((tag: string) => (
												<span
													key={tag}
													className="tag-badge"
												>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
