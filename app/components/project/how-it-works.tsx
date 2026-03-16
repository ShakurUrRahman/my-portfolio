import { Section } from "../drawer-subcomponents";

// ── Compact variant (drawer) ──
function HowItWorksCompact({ steps }: { steps: string[] }) {
	return (
		<div className="flex flex-col gap-3.5">
			{steps.map((step, i) => (
				<div key={i} className="flex gap-4 items-start">
					<span
						className="font-syne font-extrabold flex items-center justify-center flex-shrink-0 rounded-md mt-px"
						style={{
							fontSize: 11,
							width: 28,
							height: 28,
							minWidth: 28,
							color: "rgba(139,92,246,.6)",
							background: "rgba(139,92,246,.08)",
							border: "1px solid rgba(139,92,246,.2)",
						}}
					>
						{String(i + 1).padStart(2, "0")}
					</span>
					<p
						className="font-mono text-sm leading-loose"
						style={{ color: "rgba(200,190,240,.7)" }}
					>
						{step}
					</p>
				</div>
			))}
		</div>
	);
}

// ── Full variant (project page) ──
function HowItWorksFull({ steps }: { steps: string[] }) {
	return (
		<div className="flex flex-col gap-4">
			{steps.map((step, i) => (
				<div key={i} className="flex gap-5 items-start">
					<span
						className="font-syne font-extrabold flex-shrink-0 flex items-center justify-center rounded-xl"
						style={{
							width: 40,
							height: 40,
							minWidth: 40,
							fontSize: 13,
							color: "rgba(139,92,246,.8)",
							background: "rgba(139,92,246,.08)",
							border: "1px solid rgba(139,92,246,.2)",
						}}
					>
						{String(i + 1).padStart(2, "0")}
					</span>
					<div
						className="flex-1 rounded-xl px-5 py-4"
						style={{
							background: "rgba(139,92,246,.04)",
							border: "1px solid rgba(139,92,246,.1)",
						}}
					>
						<p
							className="font-mono text-sm leading-loose"
							style={{ color: "rgba(200,190,240,.7)" }}
						>
							{step}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

// ── Main export ──
export default function HowItWorks({
	steps,
	variant = "compact",
	className = "",
}: {
	steps: string[];
	variant?: "compact" | "full";
	className?: string;
}) {
	if (!steps?.length) return null;

	return (
		<Section label="How It Works" className={className}>
			{variant === "full" ? (
				<HowItWorksFull steps={steps} />
			) : (
				<HowItWorksCompact steps={steps} />
			)}
		</Section>
	);
}
