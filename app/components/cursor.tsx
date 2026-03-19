"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: -100, y: -100 });
	const ring = useRef({ x: -100, y: -100 });
	const hasMoved = useRef(false);

	// ── Animation + input tracking ──
	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			pos.current = { x: e.clientX, y: e.clientY };
			// reveal cursor only after first real mouse position
			if (!hasMoved.current) {
				hasMoved.current = true;
				if (dotRef.current) dotRef.current.style.opacity = "1";
				if (ringRef.current) ringRef.current.style.opacity = "1";
			}
		};

		const onTouchMove = (e: TouchEvent) => {
			const t = e.touches[0];
			pos.current = { x: t.clientX, y: t.clientY };
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("touchmove", onTouchMove, { passive: true });

		let raf: number;
		const animate = () => {
			ring.current.x += (pos.current.x - ring.current.x) * 0.12;
			ring.current.y += (pos.current.y - ring.current.y) * 0.12;
			if (dotRef.current)
				dotRef.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
			if (ringRef.current)
				ringRef.current.style.transform = `translate(${ring.current.x - 18}px,${ring.current.y - 18}px)`;
			raf = requestAnimationFrame(animate);
		};
		animate();

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("touchmove", onTouchMove);
			cancelAnimationFrame(raf);
		};
	}, []);

	// ── Hide cursor while loader is active ──
	useEffect(() => {
		const dot = dotRef.current;
		const ring = ringRef.current;
		if (!dot || !ring) return;

		const update = () => {
			const isLoading = document.body.classList.contains("loading");
			if (isLoading) {
				dot.style.opacity = "0";
				ring.style.opacity = "0";
			} else if (hasMoved.current) {
				dot.style.opacity = "1";
				ring.style.opacity = "1";
			}
			// not loading + hasn't moved yet → stay hidden (no flash)
		};

		update();

		const observer = new MutationObserver(update);
		observer.observe(document.body, { attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
			<div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
		</>
	);
}
