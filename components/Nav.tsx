"use client";

import {useLayoutEffect, useEffect, useState} from "react";
import HarmonyLogo from "./logos/HarmonyLogo";
import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	SignOutButton,
	UserButton,
} from "@clerk/nextjs";

export const Nav = () => {
	const [isDarkMode, setIsDarkMode] = useState(true);

	useLayoutEffect(() => {
		const el = document.documentElement;
		setIsDarkMode(el.classList.contains("dark"));
	}, []);

	useEffect(() => {
		fetch("/api/check-user")
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					console.error("Error checking user:", data.error);
				} else {
					console.log("User info:", data.user);
				}
			})
			.catch((err) => console.error("Failed to fetch user:", err));
	}, []);

	const toggleDark = () => {
		const el = document.documentElement;
		el.classList.toggle("dark");
		setIsDarkMode((prev) => !prev);
	};

	return (
		<>
			<nav className="px-6 py-3 flex items-center h-16 z-50 bg-card border-b border-border shadow-sm">
				<HarmonyLogo />
				<div className="ml-auto flex items-center gap-3">
					<Button
						onClick={toggleDark}
						variant="ghost"
						className="flex items-center gap-2 transition-colors hover:bg-muted hover:text-foreground"
					>
						{isDarkMode ? (
							<Sun className="size-4" />
						) : (
							<Moon className="size-4" />
						)}
						<span className="text-sm font-medium">
							{isDarkMode ? "Light" : "Dark"} Mode
						</span>
					</Button>

					<SignedIn>
						<UserButton />
						<SignOutButton>
							<Button variant="outline" className="hover:bg-muted">
								Sign Out
							</Button>
						</SignOutButton>
					</SignedIn>
				</div>
			</nav>

			{/* 🧘 Signed Out Landing View */}
			<SignedOut>
				<main className="flex flex-col items-center justify-center text-center px-4 py-24 min-h-[calc(100vh-4rem)] bg-background animate-fade-in">
					<h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-foreground">
						Welcome to <span className="text-primary">Harmony</span> 🧘‍♀️
					</h1>
					<p className="text-muted-foreground max-w-md mb-6 text-base sm:text-lg">
						Sign in to access your personal AI therapist and start your journey
						to a calmer mind.
					</p>
					<div className="flex flex-wrap gap-4">
						<SignInButton mode="modal">
							<Button size="lg" className="px-6">
								Sign In
							</Button>
						</SignInButton>
						<SignUpButton mode="modal">
							<Button
								variant="outline"
								size="lg"
								className="px-6 hover:bg-muted"
							>
								Sign Up
							</Button>
						</SignUpButton>
					</div>
				</main>
			</SignedOut>
		</>
	);
};
