export default function ImageCell({
	src,
	gradient,
	emoji,
	style,
	className,
}: any) {
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
			{src ? (
				<div
					style={{
						width: "100%",
						height: "100%",
						backgroundImage: `url(${src})`,
						backgroundSize: "cover",
						backgroundPosition: "top center",
						backgroundRepeat: "no-repeat",
						transition: "background-position 3s ease",
						cursor: "pointer",
					}}
					onMouseEnter={(e) => {
						const el = e.currentTarget as HTMLDivElement;
						const img = new Image();
						img.src = src;
						img.onload = () => {
							// Calculate duration: 1s per 300px of natural height, min 3s max 12s
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
						// If already cached
						if (img.complete) img.onload?.(new Event("load"));
					}}
					onMouseLeave={(e) => {
						const el = e.currentTarget as HTMLDivElement;
						el.style.transition = "background-position 4s ease";
						el.style.backgroundPosition = "top center";
						setTimeout(() => {
							el.style.backgroundSize = "cover";
							el.style.transition = "background-position 3s ease";
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
			) : (
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
