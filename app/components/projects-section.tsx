import Link from "next/link";
import { Glass, SectionTitle } from ".";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.6),rgba(6,182,212,.6))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.6))",
	"linear-gradient(135deg,rgba(245,158,11,.6),rgba(139,92,246,.6))",
];
const EMOJIS = ["🚀", "✨", "📊", "🎯", "⚡", "🌊"];

export default function ProjectsSection({ data }) {
	const visible = data.projects.filter((p) => p.visible);
	return (
		<div
			className="min-h-screen
      pt-24 sm:pt-28 md:pt-32 lg:pt-36
      pb-12 sm:pb-16 md:pb-20
      px-4 sm:px-6 md:px-10
      max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
      mx-auto"
		>
			<SectionTitle label="002" title="Projects" />

			{/* 1-col → sm: 1-col → md: 2-col → xl: 3-col */}
			<div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
        gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12"
			>
				{visible.map((p, i) => (
					<Glass
						key={p.id}
						hover
						className="p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4"
					>
						{/* Thumbnail */}
						<div
							className="h-32 sm:h-36 md:h-40 rounded-xl flex items-center justify-center
              text-4xl sm:text-5xl overflow-hidden mb-1 sm:mb-2"
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

						<h3 className="font-syne font-bold text-white text-base sm:text-lg md:text-xl">
							{p.title}
						</h3>
						<p
							className="font-mono text-xs leading-loose"
							style={{ color: "rgba(200,190,240,.65)" }}
						>
							{p.description}
						</p>

						{/* Tags */}
						<div className="flex flex-wrap gap-1.5 sm:gap-2">
							{p.tags.map((tag) => (
								<span key={tag} className="tag-badge">
									{tag}
								</span>
							))}
						</div>

						{/* Links */}
						<div className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-2">
							{p.github && (
								<Link
									href={p.github}
									target="_blank"
									rel="noopener noreferrer"
									className="proj-ghost font-mono text-xs rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 no-underline"
								>
									⌥ GitHub
								</Link>
							)}
							{p.live && (
								<Link
									href={p.live}
									target="_blank"
									rel="noopener noreferrer"
									className="proj-filled font-mono text-xs rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 no-underline"
								>
									↗ Live
								</Link>
							)}
						</div>
					</Glass>
				))}
			</div>
		</div>
	);
}
