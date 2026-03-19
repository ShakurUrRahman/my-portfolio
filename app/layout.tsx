import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Syne, DM_Mono } from "next/font/google";

const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
	variable: "--font-dm-mono",
	display: "swap",
	preload: true,
});

const syne = Syne({
	subsets: ["latin"],
	weight: ["400", "700", "800"],
	variable: "--font-syne",
	display: "swap",
	preload: true,
});

export const metadata: Metadata = {
	title: "Shakurur Rahman - Web Developer",
	description: "Portfolio of Shakurur Rahman, Junior Web Developer",
	icons: { icon: "/favicon.png" },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${dmMono.variable} ${syne.variable}`}>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, interactive-widget=resizes-visual"
				/>
			</head>
			<body suppressHydrationWarning>{children}</body>
		</html>
	);
}
