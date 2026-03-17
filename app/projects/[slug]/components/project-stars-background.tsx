"use client";

export default function StarsBackground() {
	const stars = Array.from({ length: 60 }, (_, i) => ({
		left: `${(i * 137.5) % 100}%`,
		top: `${(i * 97.3) % 100}%`,
		size: i % 5 === 0 ? 2 : 1,
	}));

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 0,
				overflow: "hidden",
				pointerEvents: "none",
			}}
		>
			{stars.map((s, i) => (
				<div
					key={i}
					style={{
						position: "absolute",
						left: s.left,
						top: s.top,
						width: s.size,
						height: s.size,
						borderRadius: "50%",
						background: "rgba(200,190,240,.4)",
					}}
				/>
			))}
			<div
				style={{
					position: "absolute",
					top: "20%",
					left: "60%",
					width: 500,
					height: 500,
					borderRadius: "50%",
					background:
						"radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 70%)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: "60%",
					left: "20%",
					width: 400,
					height: 400,
					borderRadius: "50%",
					background:
						"radial-gradient(circle,rgba(6,182,212,.04) 0%,transparent 70%)",
				}}
			/>
		</div>
	);
}
