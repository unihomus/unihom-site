import CategorySidebar from "@/components/CategorySidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategorySelector from "@/components/CategorySelector";

export default async function productPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// side bar that shows all categories.
	// click category to show products under that category
	// click on the product to go to the product page /products/[slug]
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore as any); //work around for now

	const { data: categories } = await (await supabase)
		.from("product_category")
		.select("*");

	const { data } = await (await supabase)
		.from("products")
		.select(`*, product_category(id, category_name)`);

	const searchQuery = await searchParams;

	// console.log(data);

	return (
		<div className="flex flex-row w-full justify-items-center justify-center">
			{/* left side bar */}
			<div className="w-0 md:w-1/4 overflow-hidden">
				<div className="w-3/4">
					{categories?.length ? (
						<CategorySidebar categories={categories} />
					) : (
						<div>Categories Not Found</div>
					)}
				</div>
			</div>

			{/* main product content */}
			<div className="w-3/4 flex flex-col gap-4">
				{/* empty search params? Show all, otherwise show category clicked */}
				<div>
					{searchQuery.category ? (
						<div>Currently browsing category: {searchQuery.category}</div>
					) : (
						<p>Currently browsing category: All</p>
					)}
				</div>

				{categories && <CategorySelector categories={categories} />}

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 w-full">
					{data ? (
						searchQuery?.category && searchQuery?.category !== "all" ? (
							data
								.filter(
									(product) =>
										product.product_category.category_name.toLowerCase() ===
										searchQuery.category
								)
								//sort by name by default
								.toSorted((a, b) => a.name.localeCompare(b.name))
								.map((product) => {
									return (
										<div
											key={product.id}
											className="flex flex-col justify-center items-center gap-2"
										>
											<Link
												href={`/products/${product.slug}`}
												className="transition-all duration-200 flex-auto rounded-md
																		hover:scale-[1.02] hover:shadow-[0px_0px_10px_5px_rgba(255,255,255,0.7)]
																			focus-within:shadow-[0px_0px_10px_5px_rgba(255,255,255,0.7)] focus-within:scale-[1.02]"
											>
												<ProductCard product={product} />
											</Link>
										</div>
									);
								})
						) : (
							data
								//sort by name by default
								.toSorted((a, b) => a.name.localeCompare(b.name))
								.map((product) => {
									return (
										<div
											key={product.id}
											className="relative flex flex-col justify-center items-center gap-2"
										>
											<Link
												href={`/products/${product.slug}`}
												className="transition-all duration-200 flex-auto rounded-md
																	hover:scale-[1.02] hover:shadow-[0px_0px_10px_5px_rgba(255,255,255,0.7)]
																		focus-within:shadow-[0px_0px_10px_5px_rgba(255,255,255,0.7)] focus-within:scale-[1.02]"
											>
												<ProductCard product={product} />
											</Link>
										</div>
									);
								})
						)
					) : (
						<div>Nothing found</div>
					)}
				</div>
			</div>
		</div>
	);
}
