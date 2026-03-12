"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
	const dotRef = useRef(null),
		ringRef = useRef(null);
	const pos = useRef({ x: -100, y: -100 }),
		ring = useRef({ x: -100, y: -100 });

	useEffect(() => {
		const move = (e) => {
			pos.current = { x: e.clientX, y: e.clientY };
		};
		window.addEventListener("mousemove", move);
		let raf;
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
			window.removeEventListener("mousemove", move);
			cancelAnimationFrame(raf);
		};
	}, []);

	useEffect(() => {
		const move = (e) => {
			pos.current = { x: e.clientX, y: e.clientY };
		};

		const touch = (e) => {
			const t = e.touches[0];
			pos.current = { x: t.clientX, y: t.clientY };
		};

		window.addEventListener("mousemove", move);
		window.addEventListener("touchmove", touch, { passive: true });

		let raf;
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
			window.removeEventListener("mousemove", move);
			window.removeEventListener("touchmove", touch);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<>
			<div ref={dotRef} className="cursor-dot" />
			<div ref={ringRef} className="cursor-ring" />
		</>
	);
}
