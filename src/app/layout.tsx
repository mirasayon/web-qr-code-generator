import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdsRSYA } from "@/ads/yandex_ads";
import { Analytics_GA } from "@/analytics/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Free QR-Code Generator",
	description: "Free QR-Code Generator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<AdsRSYA.InitHead />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
				<AdsRSYA.UniversalBanner />
			</body>
			<Analytics_GA.Analytics />
		</html>
	);
}
