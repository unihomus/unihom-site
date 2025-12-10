"use client";

import {
	usePathname,
	useSearchParams,
	useRouter,
	redirect,
} from "next/navigation";
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
		const paramFilter = searchParams.get("category");
		if (paramFilter) {
			setSelectedCategory(paramFilter);
		} else {
			setSelectedCategory("all");
		}
	}, [searchParams]);

	const createQueryString = (updates: { [key: string]: string | null }) => {
		const params = new URLSearchParams(window.location.search);

		Object.entries(updates).forEach(([key, value]) => {
			if (value === null) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		});

		return params.toString();
	};

	const handleClick = (category: string) => {
		setSelectedCategory(category);
		if (category !== "all") {
			router.push(
				pathname +
					"?" +
					createQueryString({ category: category.toLowerCase(), page: "1" })
			);
		} else {
			redirect("/products");
		}
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
