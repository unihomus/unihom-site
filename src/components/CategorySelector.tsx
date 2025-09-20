"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

// Category selector for small screen, replacing the category sidebar
export default function CategorySelector({
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
		console.log(selectedCategory + ": " + category);
	};

	return (
		<div className="w-full md:hidden overflow-hidden flex flex-row flex-wrap gap-1 justify-between items-center bg-white/70 rounded-md p-2">
			<button
				onClick={() => handleClick("all")}
				className={`p-2 px-4 cursor-pointer text-black rounded-md transition-all
                    hover:bg-white
                      focus-within:bg-white ${
												selectedCategory === "all" ? "bg-white rounded-md" : ""
											}`}
			>
				All
			</button>
			{categories?.map((object) => (
				<button
					key={object.id}
					onClick={() => handleClick(object.category_name)}
					className={`p-2 px-4 cursor-pointer text-black transition-all rounded-md 
                        hover:bg-white 
                          focus-within:bg-white ${
														selectedCategory ===
														object.category_name.toLowerCase()
															? "bg-white rounded-md"
															: ""
													}`}
				>
					{object.category_name}
				</button>
			))}
		</div>
	);
}
