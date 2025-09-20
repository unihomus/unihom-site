"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import NavItem from "./NavItem";

export default function Nav() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 20 ? setScrolled(true) : setScrolled(false);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`flex flex-row p-4 bg-transparent sticky top-0 transition-all z-999 h-fit
				${
					scrolled
						? "bg-white/90 text-black"
						: "text-white [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]"
				}`}
		>
			<div>
				<Link href="/">
					<Logo />
				</Link>
			</div>
			<div className="flex ml-auto gap-20 px-5">
				<NavItem
					scrolled={scrolled}
					navContent="projects"
				/>
				<NavItem
					scrolled={scrolled}
					navContent="products"
				/>
				<NavItem
					scrolled={scrolled}
					navContent="contact"
				/>
			</div>
		</nav>
	);
}
