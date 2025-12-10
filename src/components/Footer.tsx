import { createClient } from "@/utils/supabase/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Footer() {
	const cookieStore = await cookies();

	const supabase = createClient(
		Promise.resolve(cookieStore as ReadonlyRequestCookies)
	); // need looking into

	const { data: categories } = await (await supabase)
		.from("product_category")
		.select("*");

	const { data: projects } = await (await supabase)
		.from("projects")
		.select("*");

	// console.log(projects);

	return (
		<footer className="p-4 flex flex-col justify-around items-center bg-black/50 gap-4">
			<div className="flex flex-row justify-around gap-4 w-full">
				{/* Product section */}
				<div className="flex flex-col gap-2">
					<Link
						href={"/products"}
						className="text-2xl font-semibold"
					>
						Products
					</Link>
					<div className="flex flex-col gap-2 pb-10">
						{categories?.length
							? categories?.map((category) => (
									<Link
										key={category.id}
										href={`products?category=${category.category_name.toLowerCase()}`}
										className="group relative text-xl w-fit"
									>
										{category.category_name}
										<span
											className={`block max-w-0
													group-hover:max-w-full 
												 		group-focus-visible:max-w-full transition-all duration-200 h-0.5 bg-white
														`}
										></span>
									</Link>
							  ))
							: null}
					</div>
				</div>

				{/* project section */}
				<div className="flex flex-col gap-2">
					<Link
						href={"/projects"}
						className="text-2xl font-semibold"
					>
						Projects
					</Link>

					<div className="flex flex-col gap-2 pb-10">
						{projects?.map((obj) => (
							<Link
								key={obj.id}
								href={`/projects/${obj.slug}`}
								className="group relative text-xl w-fit"
							>
								{obj.name}
								<span
									className={`block max-w-0
													group-hover:max-w-full 
												 		group-focus-visible:max-w-full transition-all duration-200 h-0.5 bg-white
														`}
								></span>
							</Link>
						))}
					</div>
				</div>

				{/* contact section */}
				<div className="flex flex-col gap-2">
					<p className="text-2xl font-semibold">Address</p>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center">
				<p className="">UNIHOM. All rights reserved 2025.</p>
				<p className="">Designed by Joe.</p>
			</div>
		</footer>
	);
}
