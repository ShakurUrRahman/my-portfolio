"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SpaceBackground from "./components/space-background";
import Cursor from "./components/cursor";
import SkillBar from "./components/skill-bar";
import HorizontalNav from "./components/nav";
import { AnimatedTitle, Glass, SectionTitle } from "./components";
import HomeSection from "./components/home-section";
import AboutSection from "./components/about-section";
import ProjectsSection from "./components/projects-section";
import ContactSection from "./components/contact-section";
import AdminPanel from "./components/admin/admin-panel";
import { initialData } from "@/data/data";
import Nav from "./components/nav";

export default function PortfolioApp() {
	const [data, setData] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [page, setPage] = useState("home");
	const scrollContainerRef = useRef(null);
	const [adminOpen, setAdminOpen] = useState(false);
	const logoClicks = useRef(0);
	const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleLogoClick = () => {
		logoClicks.current += 1;

		clearTimeout(logoTimer.current!);
		logoTimer.current = setTimeout(() => {
			logoClicks.current = 0;
		}, 2000);

		if (logoClicks.current === 5) {
			logoClicks.current = 0;
			setAdminOpen(true);
		}
	};

	useEffect(() => {
		fetch("/api/data")
			.then((r) => r.json())
			.then((d) => {
				setData(d);
				setLoaded(true);
			});
	}, []);

	// Save to API (and file) whenever data changes
	// Debounced to avoid too many writes
	useEffect(() => {
		if (!loaded || !data || !data.about) return; // ← guard
		const timer = setTimeout(() => {
			fetch("/api/data", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
		}, 800);
		return () => clearTimeout(timer);
	}, [data, loaded]);

	useEffect(() => {
		if (!loaded) return; // ← wait for data first
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const newSection = Math.round(
				container.scrollLeft / window.innerWidth,
			);
			setPage(newSection);
		};

		const handleWheel = (e) => {
			if (e.deltaY !== 0) {
				e.preventDefault();
				container.scrollBy({ left: e.deltaY * 3, behavior: "smooth" });
			}
		};

		container.addEventListener("scroll", handleScroll);
		window.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			container.removeEventListener("scroll", handleScroll);
			window.removeEventListener("wheel", handleWheel);
		};
	}, [loaded]); // ← re-run when loaded becomes true

	const onNewMessage = useCallback(
		(msg) => setData((d) => ({ ...d, messages: [msg, ...d.messages] })),
		[],
	);

	if (!loaded) return null; // or a loading spinner
	const scrollToSection = (index) => {
		const container = scrollContainerRef.current;
		if (container) {
			container.scrollTo({
				left: index * window.innerWidth,
				behavior: "smooth",
			});
		}
	};

	if (logoClicks.current === 5) {
		logoClicks.current = 0;
		setAdminOpen(true); // ← instead of scrollToSection(4)
	}
	return (
		<>
			<SpaceBackground />
			<Cursor />
			{!adminOpen && (
				<Nav
					page={page}
					available={data.about.available}
					scrollToSection={scrollToSection}
					onLogoClick={handleLogoClick}
				/>
			)}

			<div
				ref={scrollContainerRef}
				className="fixed inset-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar smooth-horizontal-scroll"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					scrollBehavior: "smooth",
				}}
			>
				<div className="flex h-full" style={{ width: "400vw" }}>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-hidden"
						style={{ zIndex: 1 }}
					>
						<HomeSection
							data={data}
							scrollToSection={scrollToSection}
							setPage={setPage}
						/>
					</section>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden"
						style={{ zIndex: 1 }}
					>
						<AboutSection data={data} />
					</section>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden"
						style={{ zIndex: 1 }}
					>
						<ProjectsSection data={data} />
					</section>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden"
						style={{ zIndex: 1 }}
					>
						<ContactSection onNewMessage={onNewMessage} />
					</section>
					{adminOpen && (
						<div
							style={{
								position: "fixed",
								inset: 0,
								zIndex: 999,
								overflowY: "auto",
								background: "#020208",
							}}
						>
							<AdminPanel
								data={data}
								setData={setData}
								onClose={() => setAdminOpen(false)}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
