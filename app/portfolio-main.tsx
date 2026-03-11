"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SpaceBackground from "./components/space-background";
import Cursor from "./components/cursor";
import Nav from "./components/nav";
import HomeSection from "./components/home-section";
import AboutSection from "./components/about-section";
import ProjectsSection from "./components/projects-section";
import ContactSection from "./components/contact-section";
import AdminPanel from "./components/admin/admin-panel";

export default function PortfolioApp() {
	const [data, setData] = useState<any>(null);
	const [loaded, setLoaded] = useState(false);
	const [page, setPage] = useState(0);
	const [adminOpen, setAdminOpen] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const logoClicks = useRef(0);
	const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// ── Fetch data on mount ──
	useEffect(() => {
		fetch("/api/data")
			.then((r) => r.json())
			.then((d) => {
				setData(d);
				setLoaded(true);
			});
	}, []);

	// ── Persist data to API (debounced 800ms) ──
	useEffect(() => {
		if (!loaded || !data?.about) return;
		const timer = setTimeout(() => {
			fetch("/api/data", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
		}, 800);
		return () => clearTimeout(timer);
	}, [data, loaded]);

	// ── Horizontal scroll + wheel hijack ──
	useEffect(() => {
		if (!loaded) return;
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const newSection = Math.round(
				container.scrollLeft / window.innerWidth,
			);
			setPage(newSection);
		};

		const handleWheel = (e: WheelEvent) => {
			if (document.body.classList.contains("drawer-open")) return;
			e.preventDefault();
			container.scrollBy({ left: e.deltaY * 3, behavior: "smooth" });
		};

		container.addEventListener("scroll", handleScroll);
		window.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			container.removeEventListener("scroll", handleScroll);
			window.removeEventListener("wheel", handleWheel);
		};
	}, [loaded]);

	// ── Helpers ──
	const scrollToSection = (index: number) => {
		const container = scrollContainerRef.current;
		if (!container) return;
		container.scrollTo({
			left: index * window.innerWidth,
			behavior: "smooth",
		});
	};

	const lockScroll = () => {
		if (scrollContainerRef.current)
			scrollContainerRef.current.style.overflowX = "hidden";
	};

	const unlockScroll = () => {
		if (scrollContainerRef.current)
			scrollContainerRef.current.style.overflowX = "auto";
	};

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

	const onNewMessage = useCallback(
		(msg: any) =>
			setData((d: any) => ({ ...d, messages: [msg, ...d.messages] })),
		[],
	);

	// ── Wait for data ──
	if (!loaded || !data) return null;

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

			{/* ── Horizontal scroll container ── */}
			<div
				id="h-scroll"
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
						<ContactSection
							onNewMessage={onNewMessage}
							onFieldFocus={lockScroll}
							onFieldBlur={unlockScroll}
						/>
					</section>
				</div>
			</div>

			{/* ── Admin overlay ── */}
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
		</>
	);
}
