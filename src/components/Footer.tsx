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

	// console.log(categories);

	return (
		<footer className="p-4 flex flex-col justify-around items-center bg-black/50 gap-4">
			<div className="flex flex-row justify-around gap-4 w-full">
				{/* Product section */}
				<div className="flex flex-col gap-2">
					<p className="text-2xl font-semibold">Products</p>
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
												 		group-focus-visible:max-w-full  transition-all duration-200 h-0.5 bg-white
														`}
										></span>
									</Link>
							  ))
							: null}
					</div>
				</div>

				{/* project section */}
				<div className="flex flex-col gap-2">
					<p className="text-2xl font-semibold">Projects</p>
				</div>

				{/* contact section */}
				<div className="flex flex-col gap-2">
					<p className="text-2xl font-semibold">Contact</p>
				</div>
			</div>

			<div>
				<p className="text-xl self-end">UNIHOM. All rights reserved 2025.</p>
				<p className="text-xl self-end">Designed by Joe.</p>
			</div>
		</footer>
	);
}
