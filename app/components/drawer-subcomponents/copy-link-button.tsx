import { useState } from "react";

export default function CopyLinkButton({
	projectId,
}: {
	projectId: number | string;
}) {
	const [copied, setCopied] = useState(false);

	const copy = () => {
		const url = `${window.location.origin}${window.location.pathname}?project=${projectId}`;
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<button
			onClick={copy}
			title="Copy shareable link"
			style={{
				background: copied
					? "rgba(16,185,129,.15)"
					: "rgba(139,92,246,.08)",
				border: `1px solid ${copied ? "rgba(16,185,129,.4)" : "rgba(139,92,246,.25)"}`,
				borderRadius: 8,
				height: 34,
				padding: "0 12px",
				display: "flex",
				alignItems: "center",
				gap: 6,
				cursor: "pointer",
				color: copied ? "#10b981" : "rgba(139,92,246,.8)",
				fontSize: 12,
				fontFamily: "'DM Mono', monospace",
				transition: "all .2s",
				whiteSpace: "nowrap",
			}}
		>
			{copied ? (
				<>
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
					Copied!
				</>
			) : (
				<>
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
						<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
					</svg>
					Share
				</>
			)}
		</button>
	);
}
