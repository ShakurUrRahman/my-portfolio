import { useEffect, useState } from "react";

export default function HorizontalNav({
	currentSection,
	scrollToSection,
	available,
}) {
	const [scrolled, setScrolled] = useState(false);
	const sections = ["home", "about", "projects", "contact", "admin"];

	useEffect(() => {
		const handleScroll = () =>
			setScrolled(window.scrollY > 40 || currentSection > 0);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [currentSection]);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-4 transition-all duration-300 ${scrolled ? "nav-frosted" : ""}`}
			style={{ zIndex: 100 }}
		>
			<button
				onClick={() => scrollToSection(0)}
				className="font-syne text-xl font-extrabold text-white flex items-center gap-2"
				style={{
					background: "none",
					border: "none",
					cursor: "pointer",
				}}
			>
				<span
					className={`inline-block w-2 h-2 rounded-full ${available ? "anim-glow-pulse" : ""}`}
					style={{ background: available ? "#10b981" : "#6b7280" }}
				/>
				SR
			</button>

			<div className="flex items-center gap-8">
				{sections.slice(0, 4).map((label, index) => (
					<button
						key={label}
						onClick={() => scrollToSection(index)}
						className={`font-mono text-xs uppercase tracking-widest pb-px nav-link ${currentSection === index ? "nav-link-active" : ""}`}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
						}}
					>
						{label}
					</button>
				))}
				<a
					href="https://drive.google.com/file/d/1seZXv8y43tScjzrPNFCJ6dVUrzg5vTD0/view"
					target="_blank"
					rel="noopener noreferrer"
					className="font-mono text-xs uppercase tracking-widest pb-px nav-link"
					style={{ textDecoration: "none", cursor: "pointer" }}
				>
					Resume
				</a>
				{/* <button
					onClick={() => scrollToSection(4)}
					className="btn-ghost font-mono text-xs uppercase tracking-wider rounded-lg px-4 py-1"
					style={{ cursor: "pointer" }}
				>
					Admin
				</button> */}
			</div>
		</nav>
	);
}
