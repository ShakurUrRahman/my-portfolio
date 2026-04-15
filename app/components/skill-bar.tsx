"use client";

import { motion } from "framer-motion";

export default function SkillBar({ name, level, index, animated = false }) {
	return (
		<div className="w-full">
			<div className="flex items-center justify-between mb-1.5 sm:mb-2">
				<span
					className="font-mono text-xs sm:text-sm"
					style={{ color: "rgba(200,190,240,.75)" }}
				>
					{name}
				</span>
				<span
					className="font-mono text-xs"
					style={{ color: "rgba(139,92,246,.6)" }}
				>
					{level}%
				</span>
			</div>
			<div
				className="h-1.5 sm:h-2 rounded-full overflow-hidden relative"
				style={{ background: "rgba(139,92,246,.1)" }}
			>
				<motion.div
					className="h-full rounded-full relative overflow-hidden"
					style={{
						background:
							"linear-gradient(90deg, rgba(139,92,246,.6), rgba(6,182,212,.6))",
					}}
					initial={{ width: 0 }}
					animate={{ width: animated ? `${level}%` : 0 }}
					transition={{
						duration: 1.2,
						delay: index * 0.1 + 0.5,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					{/* Shimmer effect */}
					<motion.div
						className="absolute inset-0 w-full h-full"
						style={{
							background:
								"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
						}}
						animate={{
							x: ["-100%", "100%"],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "linear",
							delay: index * 0.1 + 1.5,
						}}
					/>
				</motion.div>
			</div>
		</div>
	);
}
