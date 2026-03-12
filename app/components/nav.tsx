"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav({ page, available, scrollToSection, onLogoClick }) {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const links = ["home", "about", "projects", "contact"];
	const linkIndex = { home: 0, about: 1, projects: 2, contact: 3 };

	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", fn);
		return () => window.removeEventListener("scroll", fn);
	}, []);

	// Trigger enter animation after mount
	useEffect(() => {
		if (menuOpen) {
			requestAnimationFrame(() => setDrawerVisible(true));
		} else {
			setDrawerVisible(false);
		}
	}, [menuOpen]);

	const closeDrawer = () => {
		setDrawerVisible(false);
		setTimeout(() => setMenuOpen(false), 280); // wait for exit transition
	};

	const go = (l) => {
		scrollToSection(linkIndex[l]);
		closeDrawer();
	};

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 flex items-center justify-between
          px-4 sm:px-6 md:px-8 lg:px-10
          py-3 sm:py-4
          transition-all duration-300 ${scrolled ? "nav-frosted" : ""}`}
				style={{ zIndex: 100 }}
			>
				{/* Logo */}
				<button
					onClick={() => {
						go("home");
						onLogoClick();
					}}
					className="font-syne text-lg sm:text-xl font-extrabold text-white flex items-center gap-2"
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
					}}
				>
					<span
						className={`inline-block w-2 h-2 rounded-full ${available ? "anim-glow-pulse" : ""}`}
						style={{
							background: available ? "#10b981" : "#6b7280",
						}}
					/>
					SR
				</button>
				{/* Desktop links */}
				<div className="hidden md:flex items-center gap-5 lg:gap-8">
					{links.map((l) => (
						<button
							key={l}
							onClick={() => go(l)}
							className={`font-mono text-xs uppercase tracking-widest pb-px nav-link ${page === linkIndex[l] ? "nav-link-active" : ""}`}
							style={{
								background: "none",
								border: "none",
								cursor: "pointer",
							}}
						>
							{l}
						</button>
					))}
					{/* Resume link */}
					<Link
						href="https://drive.google.com/file/d/1seZXv8y43tScjzrPNFCJ6dVUrzg5vTD0/view"
						target="_blank"
						rel="noopener noreferrer"
						className="btn-ghost font-mono text-xs uppercase tracking-wider rounded-lg px-3 lg:px-4 py-1 no-underline"
					>
						Resume ↗
					</Link>
				</div>

				{/* Hamburger */}
				<button
					onClick={() => setMenuOpen((o) => !o)}
					className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
					}}
				>
					<span
						className="block h-px transition-all duration-300"
						style={{
							background: "rgba(139,92,246,.9)",
							width: menuOpen ? "0" : "20px",
							opacity: menuOpen ? 0 : 1,
						}}
					/>
					<span
						className="block h-px transition-all duration-300"
						style={{
							background: "rgba(139,92,246,.9)",
							width: menuOpen ? "0" : "20px",
							opacity: menuOpen ? 0 : 1,
						}}
					/>
					<span
						className="block h-px transition-all duration-300"
						style={{
							background: "rgba(139,92,246,.9)",
							width: menuOpen ? "0" : "20px",
							opacity: menuOpen ? 0 : 1,
						}}
					/>
				</button>
			</nav>

			{/* Mobile Drawer */}
			{menuOpen && (
				<>
					{/* Backdrop */}
					<div
						onClick={closeDrawer}
						style={{
							position: "fixed",
							inset: 0,
							background: "rgba(0,0,0,.65)",
							zIndex: 199,
							opacity: drawerVisible ? 1 : 0,
							transition: "opacity 280ms ease",
						}}
					/>

					{/* Drawer panel */}
					<div
						style={{
							position: "fixed",
							top: 0,
							right: 0,
							height: "100%",
							width: "72vw",
							maxWidth: "300px",
							background: "rgba(5,4,14,.97)",
							backdropFilter: "blur(24px)",
							WebkitBackdropFilter: "blur(24px)",
							borderLeft: "1px solid rgba(139,92,246,.25)",
							zIndex: 200,
							display: "flex",
							flexDirection: "column",
							padding: "28px 28px 40px",
							overflowY: "auto",
							transform: drawerVisible
								? "translateX(0)"
								: "translateX(100%)",
							transition:
								"transform 280ms cubic-bezier(0.4,0,0.2,1)",
						}}
					>
						{/* Header row: label + close button */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: 32,
							}}
						>
							<span className="font-mono text-xs uppercase tracking-widest text-purple-400">
								Navigation
							</span>
							<button
								onClick={closeDrawer}
								style={{
									background: "rgba(139,92,246,.12)",
									border: "1px solid rgba(139,92,246,.25)",
									borderRadius: 8,
									width: 32,
									height: 32,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									color: "rgba(139,92,246,.9)",
									fontSize: 18,
									lineHeight: 1,
									flexShrink: 0,
								}}
								aria-label="Close menu"
							>
								✕
							</button>
						</div>

						{/* Nav links */}
						{links.map((l) => (
							<button
								key={l}
								onClick={() => go(l)}
								style={{
									fontFamily: "'DM Mono',monospace",
									fontSize: 15,
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									padding: "16px 0",
									textAlign: "left",
									background: "none",
									border: "none",
									borderBottom:
										"1px solid rgba(139,92,246,.12)",
									cursor: "pointer",
									width: "100%",
									color:
										page === linkIndex[l]
											? "rgba(139,92,246,1)"
											: "rgba(200,190,240,.75)",
									transition: "color .2s",
								}}
							>
								{l}
							</button>
						))}
						<Link
							href="https://drive.google.com/file/d/1seZXv8y43tScjzrPNFCJ6dVUrzg5vTD0/view"
							target="_blank"
							rel="noopener noreferrer"
							onClick={closeDrawer}
							style={{
								fontFamily: "'DM Mono',monospace",
								fontSize: 15,
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								padding: "16px 0",
								textAlign: "left",
								borderBottom: "1px solid rgba(139,92,246,.12)",
								width: "100%",
								color: "rgba(6,182,212,0.9)",
								textDecoration: "none",
								display: "block",
							}}
						>
							Resume ↗
						</Link>
					</div>
				</>
			)}
		</>
	);
}
