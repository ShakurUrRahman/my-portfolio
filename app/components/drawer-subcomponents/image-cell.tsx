export default function ImageCell({ src, gradient, emoji, style }: any) {
	return (
		<div
			style={{
				background: gradient,
				borderRadius: 10,
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: 40,
				position: "relative",
				...style,
			}}
		>
			{src ? (
				<img
					src={src}
					alt=""
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			) : (
				<>
					<div
						style={{
							position: "absolute",
							inset: 0,
							background: gradient,
						}}
					/>
					<span
						style={{
							position: "relative",
							zIndex: 1,
							opacity: 0.7,
						}}
					>
						{emoji}
					</span>
				</>
			)}
		</div>
	);
}
