// drawer-subcomponents/challenges-learnings.tsx

export function ChallengesLearnings({
	challenges,
	learnings,
	wrapperClassName = "grid grid-cols-1 sm:grid-cols-2 gap-4",
	cardClassName = "rounded-2xl p-6",
	textSize = "text-sm",
}: {
	challenges?: string;
	learnings?: string;
	wrapperClassName?: string;
	cardClassName?: string;
	textSize?: string;
}) {
	if (!challenges && !learnings) return null;

	return (
		<div className={`${wrapperClassName} whitespace-pre-wrap`}>
			{challenges && (
				<div
					className={cardClassName}
					style={{
						background: "rgba(239,68,68,.05)",
						border: "1px solid rgba(239,68,68,.15)",
					}}
				>
					<p
						className="font-mono text-xs uppercase tracking-widest mb-3 sm:mb-4"
						style={{ color: "rgba(239,68,68,.6)" }}
					>
						⚠ Challenges
					</p>
					<p
						className={`font-mono ${textSize} leading-loose`}
						style={{ color: "rgba(200,190,240,.65)" }}
					>
						{challenges}
					</p>
				</div>
			)}
			{learnings && (
				<div
					className={cardClassName}
					style={{
						background: "rgba(16,185,129,.05)",
						border: "1px solid rgba(16,185,129,.15)",
					}}
				>
					<p
						className="font-mono text-xs uppercase tracking-widest mb-3 sm:mb-4"
						style={{ color: "rgba(16,185,129,.6)" }}
					>
						✦ Learnings
					</p>
					<p
						className={`font-mono ${textSize} leading-loose`}
						style={{ color: "rgba(200,190,240,.65)" }}
					>
						{learnings}
					</p>
				</div>
			)}
		</div>
	);
}
