import { Glass, SectionTitle } from ".";
import SkillBar from "./skill-bar";

export default function AboutPage({ data }) {
	return (
		<div className="min-h-screen pt-36 pb-20 px-10 max-w-5xl mx-auto">
			<SectionTitle label="001" title="About Me" />
			<div className="grid grid-cols-2 gap-8 mt-12">
				<Glass hover className="p-10">
					<div
						className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-7"
						style={{
							background:
								"linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))",
						}}
					>
						👨‍💻
					</div>
					<h3 className="font-syne font-bold text-white text-2xl mb-3">
						{data.about.name}
					</h3>
					<p className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-5">
						{data.about.role}
					</p>
					<p
						className="font-mono text-sm leading-loose"
						style={{ color: "rgba(200,190,240,.7)" }}
					>
						{data.about.bio}
					</p>
					<div className="flex flex-wrap gap-3 mt-7">
						{[
							["⚡ GitHub", data.about.socials?.github],
							["🔗 LinkedIn", data.about.socials?.linkedin],
							["🐦 Twitter", data.about.socials?.twitter],
						].map(([label, href]) => (
							<a
								key={label}
								href={href || "#"}
								className="font-mono text-xs text-purple-400 social-link rounded-md px-3 py-1 no-underline"
							>
								{label}
							</a>
						))}
					</div>
				</Glass>

				<Glass hover className="p-10">
					<h4 className="font-syne font-bold text-white text-lg mb-7">
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
