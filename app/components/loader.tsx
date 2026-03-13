"use client";

import { useEffect, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
	const [progress, setProgress] = useState(0);
	const [phase, setPhase] = useState(0); // 0=loading 1=done 2=exit

	useEffect(() => {
		// Ramp progress 0→100 over ~1.8s
		const start = performance.now();
		const duration = 1800;
		const raf = requestAnimationFrame(function tick(now) {
			const p = Math.min(((now - start) / duration) * 100, 100);
			setProgress(Math.floor(p));
			if (p < 100) {
				requestAnimationFrame(tick);
			} else {
				setPhase(1);
				setTimeout(() => setPhase(2), 400);
				setTimeout(onDone, 800);
			}
		});
		return () => cancelAnimationFrame(raf);
	}, [onDone]);

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 9999,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "rgb(2,2,8)",
				opacity: phase === 2 ? 0 : 1,
				transition: "opacity 400ms ease",
				overflow: "hidden",
			}}
		>
			{/* Stars */}
			<Stars />

			{/* Center content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 32,
					position: "relative",
					zIndex: 1,
				}}
			>
				{/* Logo ring */}
				<div style={{ position: "relative", width: 88, height: 88 }}>
					{/* Spinning ring */}
					<svg
						width="88"
						height="88"
						viewBox="0 0 88 88"
						style={{
							position: "absolute",
							inset: 0,
							animation: "spin 1.8s linear infinite",
						}}
					>
						<circle
							cx="44"
							cy="44"
							r="40"
							fill="none"
							stroke="rgba(139,92,246,.12)"
							strokeWidth="1.5"
						/>
						<circle
							cx="44"
							cy="44"
							r="40"
							fill="none"
							stroke="url(#ring-grad)"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeDasharray="60 192"
							strokeDashoffset="0"
						/>
						<defs>
							<linearGradient
								id="ring-grad"
								x1="0"
								y1="0"
								x2="1"
								y2="1"
							>
								<stop
									offset="0%"
									stopColor="rgba(139,92,246,0)"
								/>
								<stop
									offset="100%"
									stopColor="rgba(139,92,246,.9)"
								/>
							</linearGradient>
						</defs>
					</svg>

					{/* Logo */}
					<div
						style={{
							position: "absolute",
							inset: 8,
							borderRadius: "50%",
							background:
								"linear-gradient(135deg,rgba(139,92,246,.25),rgba(6,182,212,.15))",
							border: "1px solid rgba(139,92,246,.3)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<span
							style={{
								fontFamily: "'Syne', sans-serif",
								fontWeight: 800,
								fontSize: 22,
								color: "#fff",
								letterSpacing: "-0.02em",
								opacity: phase >= 1 ? 1 : 0.9,
							}}
						>
							SR
						</span>
					</div>
				</div>

				{/* Status text */}
				<div style={{ textAlign: "center" }}>
					<p
						style={{
							fontFamily: "'DM Mono', monospace",
							fontSize: 11,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "rgba(139,92,246,.6)",
							marginBottom: 16,
						}}
					>
						{phase >= 1 ? "Ready" : "Initializing"}
					</p>

					{/* Progress bar */}
					<div
						style={{
							width: 180,
							height: 1,
							background: "rgba(139,92,246,.12)",
							borderRadius: 1,
							overflow: "hidden",
						}}
					>
						<div
							style={{
								height: "100%",
								width: `${progress}%`,
								background:
									"linear-gradient(90deg,rgba(139,92,246,.6),rgba(6,182,212,.8))",
								borderRadius: 1,
								transition: "width 60ms linear",
							}}
						/>
					</div>

					{/* Percentage */}
					<p
						style={{
							fontFamily: "'DM Mono', monospace",
							fontSize: 10,
							color: "rgba(200,190,240,.25)",
							marginTop: 10,
							letterSpacing: "0.1em",
						}}
					>
						{progress}%
					</p>
				</div>
			</div>

			<style>{`
				@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
				@keyframes twinkle { 0%,100% { opacity:.15; } 50% { opacity:.7; } }
			`}</style>
		</div>
	);
}

function Stars() {
	const stars = Array.from({ length: 60 }, (_, i) => ({
		x: (i * 137.5) % 100,
		y: (i * 97.3) % 100,
		size: i % 4 === 0 ? 2 : 1,
		delay: (i * 0.3) % 4,
		duration: 2 + (i % 3),
	}));

	return (
		<div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
			{stars.map((s, i) => (
				<div
					key={i}
					style={{
						position: "absolute",
						left: `${s.x}%`,
						top: `${s.y}%`,
						width: s.size,
						height: s.size,
						borderRadius: "50%",
						background: "rgba(200,190,240,.5)",
						animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
					}}
				/>
			))}
			{/* Nebula glow */}
			<div
				style={{
					position: "absolute",
					top: "30%",
					left: "50%",
					transform: "translate(-50%,-50%)",
					width: 400,
					height: 400,
					borderRadius: "50%",
					background:
						"radial-gradient(circle,rgba(139,92,246,.06) 0%,transparent 70%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: "60%",
					left: "60%",
					transform: "translate(-50%,-50%)",
					width: 300,
					height: 300,
					borderRadius: "50%",
					background:
						"radial-gradient(circle,rgba(6,182,212,.04) 0%,transparent 70%)",
					pointerEvents: "none",
				}}
			/>
		</div>
	);
}
