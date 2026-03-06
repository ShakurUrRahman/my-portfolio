import { AnimatedTitle } from ".";

export default function HomePage({ data, scrollToSection }) {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center relative px-10 pt-28 pb-20">
			{data.about.available && (
				<div
					className="inline-flex items-center gap-2 avail-badge rounded-full px-5 py-1 mb-10 anim-fade-up"
					style={{ animationDelay: ".1s" }}
				>
					<span
						className="inline-block w-2 h-2 rounded-full anim-glow-pulse"
						style={{ background: "#10b981" }}
					/>
					<span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
						Available for Work
					</span>
				</div>
			)}

			<h1
				className="font-syne font-extrabold text-white mb-7"
				style={{
					fontSize: "clamp(52px,9vw,110px)",
					lineHeight: 0.95,
					letterSpacing: "-0.02em",
				}}
			>
				<AnimatedTitle text={data.about.name} delay={0.2} />
			</h1>

			<p
				className="font-mono uppercase tracking-widest text-purple-400 mb-8 anim-fade-up"
				style={{
					fontSize: "clamp(14px,2vw,18px)",
					animationDelay: ".8s",
				}}
			>
				{data.about.role}
			</p>

			<p
				className="font-mono leading-loose max-w-xl mb-14 anim-fade-up"
				style={{
					fontSize: 16,
					color: "rgba(200,190,240,.65)",
					animationDelay: "1s",
				}}
			>
				{data.about.bio}
			</p>

			<div
				className="flex flex-wrap gap-4 justify-center anim-fade-up"
				style={{ animationDelay: "1.2s" }}
			>
				<button
					onClick={() => scrollToSection(2)}
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-9 py-3"
					style={{ cursor: "pointer" }}
				>
					View Work
				</button>
				<button
					onClick={() => scrollToSection(3)}
					className="btn-outline font-mono text-xs uppercase tracking-widest rounded-xl px-9 py-3"
					style={{ cursor: "pointer" }}
				>
					Get in Touch
				</button>
			</div>

			<div
				className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-3 anim-fade-up"
				style={{ animationDelay: "1.8s" }}
			>
				<span
					className="font-mono text-xs tracking-widest uppercase"
					style={{ color: "rgba(139,92,246,.4)" }}
				>
					Scroll
				</span>
				<div className="flex items-center gap-1">
					<div
						className="w-12 h-px anim-scroll-horizontal"
						style={{
							background:
								"linear-gradient(to right,rgba(139,92,246,.6),transparent)",
						}}
					/>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						className="anim-pulse-glow"
					>
						<path
							d="M6 4L10 8L6 12"
							stroke="rgba(139,92,246,.6)"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}
