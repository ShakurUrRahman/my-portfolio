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
		<div style={{ marginBottom: 28 }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 12,
					marginBottom: 16,
				}}
			>
				<p
					className="font-mono text-xs uppercase tracking-widest"
					style={{
						color: "rgba(139,92,246,.5)",
						whiteSpace: "nowrap",
					}}
				>
					{label}
				</p>
				<div
					style={{
						flex: 1,
						height: 1,
						background:
							"linear-gradient(to right, rgba(139,92,246,.2), transparent)",
					}}
				/>
			</div>
			{children}
		</div>
	);
}
