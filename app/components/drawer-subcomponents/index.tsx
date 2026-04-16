"use client";

import { motion } from "framer-motion";

export function StatusBadge({ status }: { status?: string | boolean }) {
	if (!status) return null;
	const label = status === true ? "Completed" : String(status);
	const ok = label === "Completed";
	return (
		<span
			className="font-mono text-xs px-2 py-0.5 rounded-full"
			style={{
				background: ok
					? "rgba(16,185,129,.12)"
					: "rgba(245,158,11,.12)",
				border: `1px solid ${ok ? "rgba(16,185,129,.3)" : "rgba(245,158,11,.3)"}`,
				color: ok ? "#10b981" : "#f59e0b",
				fontSize: 10,
			}}
		>
			{ok ? "● " : "◌ "}
			{label}
		</span>
	);
}

export function Section({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mb-7">
			<motion.p
				className="font-mono text-xs uppercase tracking-widest mb-4"
				style={{ color: "rgba(139,92,246,.5)" }}
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				{label}
			</motion.p>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{children}
			</motion.div>
		</div>
	);
}
