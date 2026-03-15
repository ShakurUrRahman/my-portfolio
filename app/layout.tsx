import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Shakurur Rahman - Web Developer",
	description: "Portfolio of Shakurur Rahman, Junior Web Developer",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, interactive-widget=resizes-visual"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
