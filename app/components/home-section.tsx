import { AnimatedTitle } from ".";

export default function HomeSection({ data, setPage, scrollToSection }) {
	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center text-center relative
      px-5 sm:px-8 md:px-12 lg:px-16
      pt-24 sm:pt-28 md:pt-32
      pb-16 sm:pb-20"
		>
			{/* Availability badge */}
			{data.about.available && (
				<div
					className="inline-flex items-center gap-2 avail-badge rounded-full
          px-3 sm:px-5 py-1 mb-6 sm:mb-8 md:mb-10 anim-fade-up"
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

			{/* Name */}
			<h1
				className="font-syne font-extrabold text-white mb-4 sm:mb-5 md:mb-7"
				style={{
					fontSize: "clamp(40px,10vw,110px)",
					lineHeight: 0.95,
					letterSpacing: "-0.02em",
				}}
			>
				<AnimatedTitle text={data.about.name} delay={0.2} />
			</h1>

			{/* Role */}
			<p
				className="font-mono uppercase tracking-widest text-purple-400 mb-5 sm:mb-6 md:mb-8 anim-fade-up
        text-xs sm:text-sm md:text-base lg:text-lg"
				style={{ animationDelay: ".8s" }}
			>
				{data.about.role}
			</p>

			{/* Bio */}
			<p
				className="font-mono leading-loose max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl
        mb-8 sm:mb-10 md:mb-14 anim-fade-up
        text-xs sm:text-sm md:text-base"
				style={{ color: "rgba(200,190,240,.65)", animationDelay: "1s" }}
			>
				{data.about.bio}
			</p>

			{/* CTAs */}
			<div
				className="flex flex-col items-center xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center anim-fade-up w-full sm:w-auto"
				style={{ animationDelay: "1.2s" }}
			>
				<button
					onClick={() => scrollToSection(2)}
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white
            rounded-xl px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 w-1/2 sm:w-auto"
					style={{ cursor: "pointer" }}
				>
					View Work
				</button>
				<button
					onClick={() => scrollToSection(3)}
					className="btn-outline font-mono text-xs uppercase tracking-widest
            rounded-xl px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 w-1/2 sm:w-auto"
					style={{ cursor: "pointer" }}
				>
					Get in Touch
				</button>
			</div>

			{/* Scroll hint — hidden on very small screens */}
			<div
				className="flex mt-16 flex-row items-center gap-2 anim-fade-up"
				style={{ animationDelay: "1.8s", zIndex: 10 }}
			>
				<div
					className="h-px w-10 sm:w-12 anim-scroll-line"
					style={{
						background:
							"linear-gradient(to right, transparent, rgba(139,92,246,.6))",
					}}
				/>
				<span
					className="font-mono text-xs tracking-widest uppercase"
					style={{ color: "rgba(139,92,246,.4)" }}
				>
					Scroll
				</span>
				<div
					className="h-px w-10 sm:w-12 anim-scroll-line"
					style={{
						background:
							"linear-gradient(to right, rgba(139,92,246,.6), transparent)",
						animationDelay: "0.3s",
					}}
				/>
			</div>
		</div>
	);
}
