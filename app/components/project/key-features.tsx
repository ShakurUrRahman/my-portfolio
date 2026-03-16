import { Section } from "../drawer-subcomponents";

export default function KeyFeatures({
	features,
	gridClass,
	gridStyle,
}: {
	features: string[];
	gridClass?: string;
	gridStyle?: React.CSSProperties;
}) {
	if (!features?.length) return null;

	return (
		<Section label="Key Features">
			<div className={gridClass} style={gridStyle}>
				{features.map((f, i) => (
					<div
						key={i}
						className="flex items-center gap-2.5 rounded-xl px-4 py-3"
						style={{
							background: "rgba(139,92,246,.06)",
							border: "1px solid rgba(139,92,246,.15)",
						}}
					>
						<span
							className="flex-shrink-0 mt-0.5 text-sm"
							style={{ color: "rgba(6,182,212,.8)" }}
						>
							✦
						</span>
						<span
							className="font-mono text-xs sm:text-sm leading-loose"
							style={{ color: "rgba(200,190,240,.8)" }}
						>
							{f}
						</span>
					</div>
				))}
			</div>
		</Section>
	);
}
