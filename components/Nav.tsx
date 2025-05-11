"use client";

import {useLayoutEffect, useEffect, useState} from "react";
import HarmonyLogo from "./logos/HarmonyLogo";
import {Button} from "./ui/button";
import {Moon, Sun} from "lucide-react";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";

export const Nav = () => {
	const [isDarkMode, setIsDarkMode] = useState(true);

	useLayoutEffect(() => {
		const el = document.documentElement;
		setIsDarkMode(el.classList.contains("dark"));
	}, []);

	useEffect(() => {
		// Call checkUser API when component mounts
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
		<div className="px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border">
			<HarmonyLogo />
			<div className="ml-auto flex items-center gap-1">
				<Button
					onClick={toggleDark}
					variant={"ghost"}
					className="ml-auto flex items-center gap-1.5"
				>
					<span>
						{isDarkMode ? (
							<Sun className="size-4" />
						) : (
							<Moon className="size-4" />
						)}
					</span>
					<span>{isDarkMode ? "Light" : "Dark"} Mode</span>
				</Button>
				<SignedOut>
					<SignInButton forceRedirectUrl={"/"} />
					<SignUpButton forceRedirectUrl={"/"} />
				</SignedOut>
				<SignedIn>
					<UserButton />
					<SignOutButton />
				</SignedIn>
			</div>
		</div>
	);
};
