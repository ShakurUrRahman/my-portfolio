"use client";

import ImageCell from "@/app/components/drawer-subcomponents/image-cell";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.7),rgba(6,182,212,.5))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.5))",
	"linear-gradient(135deg,rgba(245,158,11,.5),rgba(139,92,246,.6))",
];

export default function PageImageArea({
	images,
	className = "",
	mobileHeight = 200,
}: {
	images: (string | null)[];
	className?: string;
	mobileHeight?: number;
}) {
	return (
		<div className={className}>
			{/* Mobile */}
			<div
				className="block sm:hidden rounded-xl overflow-hidden"
				style={{ height: mobileHeight }}
			>
				<ImageCell
					src={images?.[0]}
					gradient={GRADIENTS[0]}
					emoji="🚀"
				/>
			</div>

			{/* sm+: 1 full-width top + 2 side by side */}
			<div className="hidden sm:flex flex-col gap-2 md:gap-2.5 rounded-2xl overflow-hidden">
				<div
					className="rounded-xl overflow-hidden"
					style={{ height: "clamp(180px,22vw,280px)" }}
				>
					<ImageCell
						src={images?.[0]}
						gradient={GRADIENTS[0]}
						emoji="🚀"
					/>
				</div>
				<div className="grid grid-cols-2 gap-2 md:gap-2.5">
					<div
						className="rounded-xl overflow-hidden"
						style={{ height: "clamp(120px,14vw,180px)" }}
					>
						<ImageCell
							src={images?.[1]}
							gradient={GRADIENTS[1]}
							emoji="⚡"
						/>
					</div>
					<div
						className="rounded-xl overflow-hidden"
						style={{ height: "clamp(120px,14vw,180px)" }}
					>
						<ImageCell
							src={images?.[2]}
							gradient={GRADIENTS[2]}
							emoji="✦"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
