"use client";

import { useState, useEffect } from "react";

export default function ImageCell({
	src,
	gradient,
	emoji,
	style,
	className,
}: any) {
	const [loading, setLoading] = useState(!!src);
	const [error, setError] = useState(false);

	// Preload image to detect when it's loaded
	useEffect(() => {
		if (!src) {
			setLoading(false);
			return;
		}

		const img = new Image();
		img.src = src;

		img.onload = () => {
			setLoading(false);
		};

		img.onerror = () => {
			setLoading(false);
			setError(true);
		};

		// Cleanup
		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [src]);

	return (
		<div
			className={className}
			style={{
				position: "relative",
				overflow: "hidden",
				borderRadius: 10,
				height: "100%",
				...style,
			}}
		>
			{src && !error ? (
				<>
					{/* Skeleton loader */}
					{loading && (
						<div
							style={{
								position: "absolute",
								inset: 0,
								background: "rgba(139,92,246,.15)",
								animation: "pulse 1.5s ease-in-out infinite",
								zIndex: 1,
							}}
						/>
					)}

					{/* Actual image */}
					<div
						style={{
							width: "100%",
							height: "100%",
							backgroundImage: `url(${src})`,
							backgroundSize: "cover",
							backgroundPosition: "top center",
							backgroundRepeat: "no-repeat",
							transition: loading
								? "none"
								: "background-position 3s ease, opacity 0.3s ease",
							cursor: "pointer",
							opacity: loading ? 0 : 1,
						}}
						onMouseEnter={(e) => {
							if (loading) return;
							const el = e.currentTarget as HTMLDivElement;
							const img = new Image();
							img.src = src;
							img.onload = () => {
								const naturalHeight = img.naturalHeight;
								const containerHeight = el.offsetHeight;
								const scrollDistance =
									(naturalHeight * el.offsetWidth) /
										img.naturalWidth -
									containerHeight;
								const duration = Math.min(
									Math.max(scrollDistance / 80, 3),
									12,
								);
								el.style.transition = `background-position ${duration}s linear`;
								el.style.backgroundSize = "100% auto";
								el.style.backgroundPosition = "bottom center";
							};
							if (img.complete) img.onload?.(new Event("load"));
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget as HTMLDivElement;
							el.style.transition = "background-position 4s ease";
							el.style.backgroundPosition = "top center";
							setTimeout(() => {
								el.style.backgroundSize = "cover";
								el.style.transition =
									"background-position 3s ease";
							}, 4000);
						}}
						onTouchStart={(e) => {
							const el = e.currentTarget as HTMLDivElement;
							const current = el.style.backgroundPosition;
							el.style.backgroundPosition =
								current === "bottom center"
									? "top center"
									: "bottom center";
						}}
					/>
				</>
			) : (
				/* Emoji fallback */
				<div
					style={{
						width: "100%",
						height: "100%",
						background: gradient,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 40,
					}}
				>
					{emoji}
				</div>
			)}
		</div>
	);
}
