import { Glass, SectionTitle } from ".";
import SkillBar from "./skill-bar";

export default function AboutSection({ data }) {
	return (
		<div
			className="min-h-screen
      pt-24 sm:pt-28 md:pt-32 lg:pt-36
      pb-12 sm:pb-16 md:pb-20
      px-4 sm:px-6 md:px-10
      max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
      mx-auto"
		>
			<SectionTitle label="001" title="About Me" />

			{/* Grid: 1-col on mobile/tablet, 2-col on lg+ */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
				{/* Bio card */}
				<Glass hover className="p-6 sm:p-8 md:p-10">
					<div
						className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full
            flex items-center justify-center
            text-2xl sm:text-3xl md:text-4xl mb-5 md:mb-7"
						style={{
							background:
								"linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))",
						}}
					>
						👨‍💻
					</div>
					<h3 className="font-syne font-bold text-white text-lg sm:text-xl md:text-2xl mb-2 md:mb-3">
						{data.about.name}
					</h3>
					<p className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-4 md:mb-5">
						{data.about.role}
					</p>
					<p
						className="font-mono text-xs sm:text-sm leading-loose"
						style={{ color: "rgba(200,190,240,.7)" }}
					>
						{data.about.bio}
					</p>
					<div className="flex flex-wrap gap-2 sm:gap-3 mt-5 md:mt-7">
						{[
							["⚡ GitHub", data.about.socials?.github],
							["🔗 LinkedIn", data.about.socials?.linkedin],
							["🐦 Twitter", data.about.socials?.twitter],
						].map(([label, href]) => (
							<a
								key={label}
								href={href || "#"}
								className="font-mono text-xs text-purple-400 social-link rounded-md px-2.5 sm:px-3 py-1 no-underline"
							>
								{label}
							</a>
						))}
					</div>
				</Glass>

				{/* Skills card */}
				<Glass hover className="p-6 sm:p-8 md:p-10">
					<h4 className="font-syne font-bold text-white text-base sm:text-lg mb-5 md:mb-7">
						Skills & Technologies
					</h4>
					{data.about.skills.map((s, i) => (
						<SkillBar key={s.name} {...s} index={i} />
					))}
				</Glass>
			</div>
		</div>
	);
}
