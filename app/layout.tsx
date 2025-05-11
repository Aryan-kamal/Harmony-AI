import type {Metadata} from "next";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import "./globals.css";
import {Nav} from "@/components/Nav";
import {cn} from "@/utils";
import {ClerkProvider} from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "Harmony-Your personal AI Therapist",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						GeistSans.variable,
						GeistMono.variable,
						"flex flex-col min-h-screen"
					)}
				>
					<Nav />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
