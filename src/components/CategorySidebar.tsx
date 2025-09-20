"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export default function CategorySidebar({
	categories,
}: {
	categories: { id: number; category_name: string }[];
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		const paramQuery = searchParams.get("category");
		// console.log("paramQuery:", paramQuery);
		if (paramQuery) {
			setSelectedCategory(paramQuery);
		} else {
			setSelectedCategory("all");
		}
	});

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const handleClick = (category: string) => {
		setSelectedCategory(category);
		router.push(
			pathname + "?" + createQueryString("category", category.toLowerCase())
		);
	};

	return (
		<div className="flex flex-col w-full gap-2">
			<button onClick={() => handleClick("all")}>
				<p
					className={`cursor-pointer transition-all p-2 
						hover:bg-white/50
							focus-visible:bg-white/50
							`}
				>
					All Products
				</p>
			</button>
			{categories?.map((object) => (
				<button
					key={object.id}
					onClick={() => handleClick(object.category_name)}
					className={`cursor-pointer transition-all p-2 
						hover:bg-white/50
							focus-visible:bg-white/50
							
						${
							selectedCategory === object.category_name.toLowerCase()
								? "bg-white text-black pointer-events-none"
								: ""
						}`}
				>
					<p>{object.category_name}</p>
				</button>
			))}
		</div>
	);
}
