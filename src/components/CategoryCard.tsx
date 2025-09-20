"use client";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
	imageSrouce,
	imageAlt,
	category,
	width = 350,
	height = 600,
}: {
	imageSrouce: string;
	imageAlt: string;
	category: string;
	width?: number;
	height?: number;
}) {
	return (
		<div
			className="flex flex-col relative justify-center items-center group cursor-pointer transition-all duration-200 rounded-md
										hover:scale-[1.03] hover:shadow-[0px_0px_15px_10px_rgba(255,255,255,0.3)]
										focus-within:scale-[1.03] focus-within:shadow-[0px_0px_15px_10px_rgba(255,255,255,1)]"
		>
			<Link
				style={{ height: "auto", flex: "1 1 auto" }}
				href={`/products?category=${category.toLowerCase()}`}
				className="flex flex-col relative justify-center items-center"
			>
				<Image
					src={imageSrouce}
					alt={imageAlt}
					width={width}
					height={height}
					style={{ height: "auto", flex: "1 1 auto" }}
					className="transition-all duration-300 rounded-md"
				/>
				<div
					className="absolute bottom-0 left-0 right-0 transition-all duration-200 bg-white/80 w-full text-center text-black pointer-events-none rounded-b-md
												group-hover:translate-y-0.5"
				>
					<p className="text-lg font-semibold">{category}</p>
				</div>
			</Link>
		</div>
	);
}
