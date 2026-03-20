"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ImageCell from "@/app/components/drawer-subcomponents/image-cell";

const GRADIENTS = [
	"linear-gradient(135deg,rgba(139,92,246,.7),rgba(6,182,212,.5))",
	"linear-gradient(135deg,rgba(6,182,212,.6),rgba(16,185,129,.5))",
	"linear-gradient(135deg,rgba(245,158,11,.5),rgba(139,92,246,.6))",
];

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
	const [zoom, setZoom] = useState(1);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const dragStart = useRef<{ x: number; y: number } | null>(null);
	const posRef = useRef({ x: 0, y: 0 });

	// Block page scroll while open
	useEffect(() => {
		const prevent = (e: WheelEvent) => e.preventDefault();
		window.addEventListener("wheel", prevent, { passive: false });
		return () => window.removeEventListener("wheel", prevent);
	}, []);

	// ESC to close
	useEffect(() => {
		const fn = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", fn);
		return () => window.removeEventListener("keydown", fn);
	}, [onClose]);

	const resetPos = () => {
		setPos({ x: 0, y: 0 });
		posRef.current = { x: 0, y: 0 };
	};

	const onWheel = useCallback((e: React.WheelEvent) => {
		e.preventDefault();
		setZoom((z) => {
			const delta = e.deltaY > 0 ? -0.15 : 0.15;
			const next = Math.min(
				MAX_ZOOM,
				Math.max(MIN_ZOOM, +(z + delta).toFixed(2)),
			);
			if (next <= 1) resetPos();
			return next;
		});
	}, []);

	const onMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setDragging(true);
		dragStart.current = {
			x: e.clientX - posRef.current.x,
			y: e.clientY - posRef.current.y,
		};
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!dragging || !dragStart.current) return;
		const x = e.clientX - dragStart.current.x;
		const y = e.clientY - dragStart.current.y;
		posRef.current = { x, y };
		setPos({ x, y });
	};

	const onMouseUp = () => {
		setDragging(false);
		dragStart.current = null;
	};

	const zoomIn = () =>
		setZoom((z) => Math.min(MAX_ZOOM, +(z + 0.5).toFixed(1)));
	const zoomOut = () =>
		setZoom((z) => {
			const next = Math.max(MIN_ZOOM, +(z - 0.5).toFixed(1));
			if (next <= 1) resetPos();
			return next;
		});
	const reset = () => {
		setZoom(1);
		resetPos();
	};

	return (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
			style={{
				background: "rgba(0,0,0,.92)",
				backdropFilter: "blur(8px)",
			}}
			onClick={zoom <= 1 ? onClose : undefined}
			onWheel={onWheel}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
		>
			{/* Image — fixed base size, scale controls zoom in AND out */}
			<img
				src={src}
				alt="Preview"
				onClick={(e) => e.stopPropagation()}
				onMouseDown={onMouseDown}
				className="rounded-xl select-none block"
				style={{
					width: "70vw",
					height: "auto",
					maxHeight: "80vh",
					objectFit: "contain",
					transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`,
					transition: dragging ? "none" : "transform 0.15s ease",
					transformOrigin: "center center",
					cursor: dragging
						? "grabbing"
						: zoom > 1
							? "grab"
							: "default",
					boxShadow: "0 0 60px rgba(139,92,246,.2)",
					userSelect: "none",
					willChange: "transform",
				}}
				draggable={false}
			/>

			{/* Controls */}
			<div
				className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl"
				style={{
					background: "rgba(5,3,18,.85)",
					border: "1px solid rgba(139,92,246,.25)",
					backdropFilter: "blur(12px)",
					zIndex: 10000,
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{/* − */}
				<button
					onClick={zoomOut}
					disabled={zoom <= MIN_ZOOM}
					className="w-8 h-8 flex items-center justify-center rounded-lg font-mono text-lg transition-all"
					style={{
						background:
							zoom <= MIN_ZOOM
								? "rgba(139,92,246,.05)"
								: "rgba(139,92,246,.15)",
						border: "1px solid rgba(139,92,246,.25)",
						color:
							zoom <= MIN_ZOOM
								? "rgba(139,92,246,.3)"
								: "rgba(139,92,246,.9)",
						cursor: zoom <= MIN_ZOOM ? "not-allowed" : "pointer",
					}}
				>
					−
				</button>

				{/* % reset */}
				<button
					onClick={reset}
					className="font-mono text-xs px-3 py-1 rounded-lg"
					style={{
						color: "rgba(200,190,240,.7)",
						background: "rgba(139,92,246,.08)",
						border: "1px solid rgba(139,92,246,.15)",
						cursor: "pointer",
						minWidth: 52,
						textAlign: "center",
					}}
				>
					{Math.round(zoom * 100)}%
				</button>

				{/* + */}
				<button
					onClick={zoomIn}
					disabled={zoom >= MAX_ZOOM}
					className="w-8 h-8 flex items-center justify-center rounded-lg font-mono text-lg transition-all"
					style={{
						background:
							zoom >= MAX_ZOOM
								? "rgba(139,92,246,.05)"
								: "rgba(139,92,246,.15)",
						border: "1px solid rgba(139,92,246,.25)",
						color:
							zoom >= MAX_ZOOM
								? "rgba(139,92,246,.3)"
								: "rgba(139,92,246,.9)",
						cursor: zoom >= MAX_ZOOM ? "not-allowed" : "pointer",
					}}
				>
					+
				</button>

				<div
					className="w-px h-5 mx-1"
					style={{ background: "rgba(139,92,246,.2)" }}
				/>

				{/* ✕ */}
				<button
					onClick={onClose}
					className="w-8 h-8 flex items-center justify-center rounded-lg font-mono text-sm"
					style={{
						background: "rgba(239,68,68,.1)",
						border: "1px solid rgba(239,68,68,.25)",
						color: "rgba(239,68,68,.8)",
						cursor: "pointer",
					}}
				>
					✕
				</button>
			</div>

			{/* Hint */}
			<p
				className="fixed top-4 left-1/2 -translate-x-1/2 font-mono text-xs pointer-events-none"
				style={{ color: "rgba(200,190,240,.3)", zIndex: 10000 }}
			>
				{zoom > 1
					? "drag to pan · scroll to zoom"
					: "scroll to zoom · click outside to close"}
			</p>
		</div>
	);
}

export default function PageImageArea({
	images,
	className = "",
	mobileHeight = 200,
}: {
	images: (string | null)[];
	className?: string;
	mobileHeight?: number;
}) {
	const [lightbox, setLightbox] = useState<string | null>(null);
	const open = (src: string | null) => {
		if (src) setLightbox(src);
	};
	const close = () => setLightbox(null);

	return (
		<>
			{lightbox && <Lightbox src={lightbox} onClose={close} />}

			<div className={className}>
				{/* Mobile */}
				<div
					className="block sm:hidden rounded-xl overflow-hidden cursor-zoom-in"
					style={{ height: mobileHeight }}
					onClick={() => open(images?.[0])}
				>
					<ImageCell
						src={images?.[0]}
						gradient={GRADIENTS[0]}
						emoji="🚀"
					/>
				</div>

				{/* sm+: 1 full-width top + 2 side by side */}
				<div className="hidden sm:flex flex-col gap-2 md:gap-2.5 rounded-2xl overflow-hidden">
					<div
						className="rounded-xl overflow-hidden cursor-zoom-in"
						style={{ height: "clamp(180px,22vw,280px)" }}
						onClick={() => open(images?.[0])}
					>
						<ImageCell
							src={images?.[0]}
							gradient={GRADIENTS[0]}
							emoji="🚀"
						/>
					</div>
					<div className="grid grid-cols-2 gap-2 md:gap-2.5">
						<div
							className="rounded-xl overflow-hidden cursor-zoom-in"
							style={{ height: "clamp(120px,14vw,180px)" }}
							onClick={() => open(images?.[1])}
						>
							<ImageCell
								src={images?.[1]}
								gradient={GRADIENTS[1]}
								emoji="⚡"
							/>
						</div>
						<div
							className="rounded-xl overflow-hidden cursor-zoom-in"
							style={{ height: "clamp(120px,14vw,180px)" }}
							onClick={() => open(images?.[2])}
						>
							<ImageCell
								src={images?.[2]}
								gradient={GRADIENTS[2]}
								emoji="✦"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
