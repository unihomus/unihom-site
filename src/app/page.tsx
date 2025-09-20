import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";

export default async function Home() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore as any); //work around for now

	const { data } = await (await supabase).from("product_category").select("*");

	const { data: heroImage } = (await supabase).storage
		.from("unihom-site")
		.getPublicUrl("hero/hero-image.webp");

	const { data: categoryArmchair } = (await supabase).storage
		.from("unihom-site")
		.getPublicUrl("categories/armchair-category.webp");

	const { data: categoryBeds } = (await supabase).storage
		.from("unihom-site")
		.getPublicUrl("categories/bed-category.webp");

	const { data: categoryDesks } = (await supabase).storage
		.from("unihom-site")
		.getPublicUrl("categories/desk-category.webp");

	const { data: categoryTables } = (await supabase).storage
		.from("unihom-site")
		.getPublicUrl("categories/table-category.webp");

	// console.log(categoryBeds);

	return (
		<main className="flex flex-col justify-center items-center bg-transparent gap-12">
			<div className="relative top-0 left-0 -z-10 -mt-30">
				<Image
					src={heroImage.publicUrl}
					alt="hero-image"
					quality={100}
					width={5000}
					height={100}
					className="object-cover grow"
				/>
				{/* fade out for bottom edge of the hero image */}
				<div className="absolute bottom-0 left-0 right-0 h-[800px] bg-gradient-to-t from-[#353137] via-[#black]/80 to-transparent" />
			</div>
			<div className="flex flex-col justify-center items-center gap-4 absolute top-[35%] text-white">
				<h1
					className="md:text-8xl text-5xl"
					style={{ textShadow: "-5px 5px 5px grey" }}
				>
					UNIHOM Joe
				</h1>
				<p
					className="text-xl"
					style={{ textShadow: "-2px 2px 5px black" }}
				>
					Your partner in craftsmanship.
				</p>
				<Link
					href={"/products"}
					className="text-lg font-semibold bg-black/30 border-2 border-white p-2 rounded-md w-full transition-all duration-300 cursor-pointer text-center 
										hover:bg-white/90 hover:text-black
												 focus-within:bg-white/90 focus-within:text-black"
				>
					Start Browsing
				</Link>
			</div>

			<div className="w-full flex flex-col gap-4 p-4">
				<div className="flex flex-row items-center p-4">
					<h2 className="self-start text-3xl font-semibold">Categories</h2>
					<Link
						href={"/products?category=all"}
						className="ml-auto group"
					>
						<p className="p-[1px] font-semibold">Browse all products</p>
						<span
							// forlight mode underline animation:
							// pathname === "/"
							// 			? scrolled
							// 				? "bg-black"
							// 				: "bg-white"
							// 			: "bg-black"
							className={`block max-w-0 bg-white
													group-hover:max-w-full 
												 		group-focus-visible:max-w-full  transition-all duration-200 h-0.5`}
						></span>
					</Link>
				</div>

				{/* Category Images */}
				<div className="flex flex-row flex-wrap gap-5 justify-around">
					{data?.map((object) => {
						switch (object.category_name) {
							case "Armchairs":
								return (
									<CategoryCard
										imageSrouce={categoryArmchair.publicUrl}
										imageAlt="category-armchairs-image"
										category={object.category_name}
										key={object.id}
									/>
								);
							case "Beds":
								return (
									<CategoryCard
										imageSrouce={categoryBeds.publicUrl}
										imageAlt="category-bed-image"
										category={object.category_name}
										key={object.id}
									/>
								);
							case "Desks":
								return (
									<CategoryCard
										imageSrouce={categoryDesks.publicUrl}
										imageAlt="category-desks-image"
										category={object.category_name}
										key={object.id}
									/>
								);
							case "Tables":
								return (
									<CategoryCard
										imageSrouce={categoryTables.publicUrl}
										imageAlt="category-tables-image"
										category={object.category_name}
										key={object.id}
									/>
								);

							default:
								return <div>Nothing found.</div>;
						}
					})}
				</div>
			</div>

			<div className="w-full flex flex-col p-4 gap-4">
				<h2 className="self-start text-3xl font-semibold p-4">
					Featured Projects
				</h2>
			</div>

			<div className="">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
					pariatur optio quo deleniti aspernatur recusandae provident commodi ex
					tempore at, odio esse eos ullam exercitationem iusto aut rerum.
					Necessitatibus, provident?
				</p>
			</div>
		</main>
	);
}
