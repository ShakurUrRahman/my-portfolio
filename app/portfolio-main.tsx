"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SpaceBackground from "./components/space-background";
import Cursor from "./components/cursor";
import SkillBar from "./components/skill-bar";
import HorizontalNav from "./components/horizontal-nav";
import { AnimatedTitle, Glass, SectionTitle } from "./components";
import HomePage from "./components/home-section";
import AboutPage from "./components/about-section";
import ProjectsPage from "./components/projects-section";
import ContactPage from "./components/contact-section";
import AdminPanel from "./components/admin/admin-panel";
import { initialData } from "@/data/data";

export default function PortfolioApp() {
	const [data, setData] = useState(initialData);
	const [currentSection, setCurrentSection] = useState(0);
	const scrollContainerRef = useRef(null);
	const onNewMessage = useCallback(
		(msg) => setData((d) => ({ ...d, messages: [msg, ...d.messages] })),
		[],
	);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const scrollLeft = container.scrollLeft;
			const sectionWidth = window.innerWidth;
			const newSection = Math.round(scrollLeft / sectionWidth);
			setCurrentSection(newSection);
		};

		// Convert vertical mouse wheel to horizontal scroll with smooth animation
		const handleWheel = (e) => {
			if (e.deltaY !== 0) {
				e.preventDefault();
				container.scrollBy({
					left: e.deltaY * 0.0001,
					behavior: "smooth",
				});
			}
		};

		container.addEventListener("scroll", handleScroll);
		window.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			container.removeEventListener("scroll", handleScroll);
			window.removeEventListener("wheel", handleWheel);
		};
	}, []);

	const scrollToSection = (index) => {
		const container = scrollContainerRef.current;
		if (container) {
			container.scrollTo({
				left: index * window.innerWidth,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			<SpaceBackground />
			<Cursor />
			<HorizontalNav
				currentSection={currentSection}
				scrollToSection={scrollToSection}
				available={data.about.available}
			/>

			<div
				ref={scrollContainerRef}
				className="fixed inset-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar smooth-horizontal-scroll"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					scrollBehavior: "smooth",
				}}
			>
				<div className="flex h-full" style={{ width: "500vw" }}>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-hidden"
						style={{ zIndex: 1 }}
					>
						<HomePage
							data={data}
							scrollToSection={scrollToSection}
						/>
					</section>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden"
						style={{ zIndex: 1 }}
					>
						<AboutPage data={data} />
					</section>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden"
						style={{ zIndex: 1 }}
					>
						<ProjectsPage data={data} />
					</section>
					<section
						className="w-screen h-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden"
						style={{ zIndex: 1 }}
					>
						<ContactPage onNewMessage={onNewMessage} />
					</section>
					{/* <section
						className="w-screen h-full flex-shrink-0 snap-start overflow-y-auto overflow-x-hidden"
						style={{ zIndex: 1 }}
					>
						<AdminPanel data={data} setData={setData} />
					</section> */}
				</div>
			</div>
		</>
	);
}
