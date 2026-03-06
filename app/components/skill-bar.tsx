import { useEffect, useRef, useState } from "react";

export default function SkillBar({ name, level, index }) {
	const [filled, setFilled] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting)
					setTimeout(() => setFilled(true), index * 100);
			},
			{ threshold: 0.3 },
		);
		if (ref.current) obs.observe(ref.current);
		return () => obs.disconnect();
	}, [index]);

	return (
		<div ref={ref} className="mb-5">
			<div className="flex justify-between mb-1">
				<span
					className="font-mono text-xs"
					style={{ color: "rgba(200,190,240,.85)" }}
				>
					{name}
				</span>
				<span className="font-mono text-xs text-purple-400">
					{level}%
				</span>
			</div>
			<div
				className="h-1 rounded-sm"
				style={{ background: "rgba(139,92,246,.12)" }}
			>
				<div
					className="skill-fill"
					style={{ width: filled ? `${level}%` : "0%" }}
				/>
			</div>
		</div>
	);
}
