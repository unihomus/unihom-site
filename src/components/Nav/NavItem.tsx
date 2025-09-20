import React from "react";
import Link from "next/link";

export default function NavItem({
	scrolled,
	navContent,
}: {
	scrolled: boolean;
	navContent: string;
}) {
	return (
		<Link
			href={`/${navContent}`}
			className="group"
		>
			<p
				className="text-lg font-semibold transition-all duration-300
													"
			>
				{String(navContent).charAt(0).toUpperCase() +
					String(navContent).slice(1)}
			</p>
			<span
				className={`block max-w-0
													group-hover:max-w-full 
												 		group-focus-visible:max-w-full  transition-all duration-200 h-0.5 ${
															scrolled ? "bg-black" : "bg-white"
														}`}
			></span>
		</Link>
	);
}
