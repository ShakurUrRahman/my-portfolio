export function SectionTitle({ label, title }) {
	return (
		<div className="flex items-baseline gap-5">
			<span
				className="font-mono text-xs tracking-widest"
				style={{ color: "rgba(139,92,246,.5)" }}
			>
				{label}
			</span>
			<h2
				className="font-syne font-extrabold text-white"
				style={{
					fontSize: "clamp(32px,5vw,56px)",
					letterSpacing: "-0.02em",
				}}
			>
				{title}
			</h2>
		</div>
	);
}

export function Glass({ children, className = "", hover = false }) {
	return (
		<div className={`glass ${hover ? "glass-hover" : ""} ${className}`}>
			{children}
		</div>
	);
}

export function AnimatedTitle({ text, delay = 0 }) {
	return (
		<span className="inline-flex flex-wrap">
			{text.split("").map((ch, i) => (
				<span
					key={i}
					className="inline-block anim-fade-up"
					style={{
						animationDelay: `${delay + i * 0.04}s`,
						whiteSpace: ch === " " ? "pre" : undefined,
					}}
				>
					{ch}
				</span>
			))}
		</span>
	);
}
