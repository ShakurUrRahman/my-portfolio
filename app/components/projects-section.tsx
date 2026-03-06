import { Glass, SectionTitle } from ".";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.6))",
	"linear-gradient(135deg,rgba(245,158,11,.6),rgba(139,92,246,.6))",
];
const EMOJIS = ["🚀", "✨", "📊", "🎯", "⚡", "🌊"];

export default function ProjectsPage({ data }) {
	return (
		<div className="min-h-screen pt-36 pb-20 px-10 max-w-5xl mx-auto">
			<SectionTitle label="002" title="Projects" />
			<div
				className="grid gap-6 mt-12"
				style={{
					gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
				}}
			>
				{data.projects
					.filter((p) => p.visible)
					.map((p, i) => (
						<Glass
							key={p.id}
							hover
							className="p-8 flex flex-col gap-4"
						>
							<div
								className="h-40 rounded-xl flex items-center justify-center text-5xl overflow-hidden mb-2"
								style={{
									background: GRADIENTS[i % GRADIENTS.length],
								}}
							>
								{p.image ? (
									<img
										src={p.image}
										alt={p.title}
										className="w-full h-full object-cover"
									/>
								) : (
									EMOJIS[i % EMOJIS.length]
								)}
							</div>
							<h3 className="font-syne font-bold text-white text-xl">
								{p.title}
							</h3>
							<p
								className="font-mono text-xs leading-loose"
								style={{ color: "rgba(200,190,240,.65)" }}
							>
								{p.description}
							</p>
							<div className="flex flex-wrap gap-2">
								{p.tags.map((tag) => (
									<span key={tag} className="tag-badge">
										{tag}
									</span>
								))}
							</div>
							<div className="flex gap-3 mt-auto pt-2">
								{p.github && (
									<a
										href={p.github}
										className="proj-ghost font-mono text-xs rounded-lg px-4 py-2 no-underline"
									>
										⌥ GitHub
									</a>
								)}
								{p.live && (
									<a
										href={p.live}
										className="proj-filled font-mono text-xs rounded-lg px-4 py-2 no-underline"
									>
										↗ Live
									</a>
								)}
							</div>
						</Glass>
					))}
			</div>
		</div>
	);
}
