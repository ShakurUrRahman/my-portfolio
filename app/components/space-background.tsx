"use client";

import { useEffect, useRef } from "react";

export default function SpaceBackground() {
	const canvasRef = useRef(null);
	const animRef = useRef(null);
	const starsRef = useRef([]);
	const nebulasRef = useRef([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener("resize", resize);

		starsRef.current = Array.from({ length: 220 }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			r: Math.random() * 1.4 + 0.2,
			speed: Math.random() * 0.004 + 0.001,
			twinkleOffset: Math.random() * Math.PI * 2,
		}));
		nebulasRef.current = [
			{
				x: canvas.width * 0.15,
				y: canvas.height * 0.25,
				rx: 420,
				ry: 280,
				color: "rgba(99,38,180,",
				baseAlpha: 0.18,
			},
			{
				x: canvas.width * 0.82,
				y: canvas.height * 0.15,
				rx: 320,
				ry: 220,
				color: "rgba(6,182,212,",
				baseAlpha: 0.12,
			},
			{
				x: canvas.width * 0.5,
				y: canvas.height * 0.75,
				rx: 500,
				ry: 200,
				color: "rgba(139,92,246,",
				baseAlpha: 0.1,
			},
			{
				x: canvas.width * 0.88,
				y: canvas.height * 0.65,
				rx: 280,
				ry: 340,
				color: "rgba(16,185,129,",
				baseAlpha: 0.08,
			},
		];

		let t = 0;
		const draw = () => {
			t += 0.008;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const bg = ctx.createRadialGradient(
				canvas.width * 0.4,
				canvas.height * 0.3,
				0,
				canvas.width * 0.5,
				canvas.height * 0.5,
				canvas.width * 0.9,
			);
			bg.addColorStop(0, "#0d0720");
			bg.addColorStop(0.4, "#050510");
			bg.addColorStop(1, "#020208");
			ctx.fillStyle = bg;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			nebulasRef.current.forEach((n, i) => {
				const pulse = Math.sin(t * 0.4 + i * 1.2) * 0.04;
				const grad = ctx.createRadialGradient(
					n.x,
					n.y,
					0,
					n.x,
					n.y,
					n.rx,
				);
				grad.addColorStop(0, `${n.color}${n.baseAlpha + pulse})`);
				grad.addColorStop(
					0.5,
					`${n.color}${(n.baseAlpha + pulse) * 0.4})`,
				);
				grad.addColorStop(1, `${n.color}0)`);
				ctx.save();
				ctx.scale(1, n.ry / n.rx);
				ctx.fillStyle = grad;
				ctx.beginPath();
				ctx.arc(n.x, n.y * (n.rx / n.ry), n.rx, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			});
			starsRef.current.forEach((s) => {
				const tw =
					Math.sin(t * s.speed * 60 + s.twinkleOffset) * 0.5 + 0.5;
				ctx.beginPath();
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255,255,255,${0.3 + tw * 0.7})`;
				ctx.shadowBlur = s.r > 1 ? 6 : 0;
				ctx.shadowColor = "rgba(180,180,255,.8)";
				ctx.fill();
				ctx.shadowBlur = 0;
			});
			if (Math.sin(t * 0.3) > 0.97) {
				const sx = (Math.sin(t * 7) * 0.5 + 0.5) * canvas.width,
					sy = Math.random() * canvas.height * 0.5,
					len = 120;
				const g = ctx.createLinearGradient(
					sx,
					sy,
					sx + len,
					sy + len * 0.4,
				);
				g.addColorStop(0, "rgba(255,255,255,0)");
				g.addColorStop(0.5, "rgba(200,220,255,.7)");
				g.addColorStop(1, "rgba(255,255,255,0)");
				ctx.strokeStyle = g;
				ctx.lineWidth = 1.5;
				ctx.beginPath();
				ctx.moveTo(sx, sy);
				ctx.lineTo(sx + len, sy + len * 0.4);
				ctx.stroke();
			}
			animRef.current = requestAnimationFrame(draw);
		};
		draw();
		return () => {
			cancelAnimationFrame(animRef.current);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 w-full h-full pointer-events-none"
			style={{ zIndex: 0 }}
		/>
	);
}
