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
	card = false,
	className = "",
}: {
	label: string;
	children: React.ReactNode;
	card?: boolean;
	className?: string;
}) {
	return (
		<div className={`mb-8 sm:mb-10 ${className}`}>
			<div className="flex items-center gap-4 mb-5">
				<p
					className="font-mono text-xs uppercase tracking-widest flex-shrink-0"
					style={{ color: "rgba(139,92,246,.5)" }}
				>
					{label}
				</p>
				<div
					className="flex-1 h-px"
					style={{
						background:
							"linear-gradient(to right, rgba(139,92,246,.2), transparent)",
					}}
				/>
			</div>
			{card ? (
				<div
					className="rounded-2xl p-6 sm:p-8"
					style={{
						background: "rgba(139,92,246,.04)",
						border: "1px solid rgba(139,92,246,.12)",
					}}
				>
					{children}
				</div>
			) : (
				children
			)}
		</div>
	);
}
