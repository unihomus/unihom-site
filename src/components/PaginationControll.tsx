"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function PaginationControll({ ...props }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const paramPage = searchParams.get("page");
		if (paramPage) {
			setCurrentPage(Number(paramPage));
		} else {
			setCurrentPage(1);
		}
	}, [searchParams]);

	const createQueryString = (updates: { [key: string]: string | null }) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			if (value === null) params.delete(key);
			else params.set(key, value);
		});

		return params.toString();
	};

	const handleClick = (nextOrPrev: string) => {
		if (nextOrPrev === "next") {
			router.push(
				pathname +
					"?" +
					createQueryString({ page: (currentPage + 1).toString() })
			);
		} else {
			router.push(
				pathname +
					"?" +
					createQueryString({ page: (currentPage - 1).toString() })
			);
		}

		// console.log("pathname");
	};

	return (
		<div className="flex flex-row gap-1">
			<button
				disabled={currentPage === 1}
				className={`border-2 px-2 ${
					currentPage === 1 ? "text-gray-400" : "cursor-pointer"
				} `}
				onClick={() => handleClick("prev")}
			>
				Prev
			</button>
			<div>
				<span>
					{currentPage} / {props.totalPage}
				</span>
			</div>
			<button
				disabled={currentPage === props.totalPage}
				className={`border-2 px-2 ${
					currentPage === props.totalPage ? "text-gray-400" : "cursor-pointer"
				} `}
				onClick={() => handleClick("next")}
			>
				Next
			</button>
		</div>
	);
}
