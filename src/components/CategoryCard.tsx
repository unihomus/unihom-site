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
										 hover:shadow-[0px_0px_15px_10px_rgba(255,255,255,0.3)]
										 focus-within:shadow-[0px_0px_15px_10px_rgba(255,255,255,1)]"
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
					style={{ width: "auto", height: "auto", flex: "1 1 auto" }}
					priority={false}
					className="transition-all duration-300 rounded-md"
				/>
				<div
					className="absolute bottom-0 h-7 left-0 right-0 overflow-hidden transition-all duration-300 bg-white/80 text-black text-center pointer-events-none rounded-b-md
											group-hover:h-[45%] group-hover:bg-black/40 group-hover:text-white"
				>
					<div className="flex flex-col gap-2">
						<p className="text-lg font-semibold">{category}</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id optio
							fugiat ex maiores, repellendus molestias sequi alias eaque odio
							dolore nemo facere corrupti provident delectus explicabo sunt
							earum animi sed.
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
