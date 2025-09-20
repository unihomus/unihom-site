import BackButton from "@/components/BackButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function IndividualProduct({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore as any); //work around for now
	const { slug } = await params;

	const { data: product } = await (await supabase)
		.from("products")
		.select("*, product_category (id, category_name)")
		.eq("slug", slug);

	const imageUrls: string[] = [];

	if (product) {
		if (product[0].imagePaths.length) {
			for (let i = 0; i < product[0].imagePaths.length; i++) {
				const { data: publicUrlObj } = await (await supabase).storage
					.from("unihom-site")
					.getPublicUrl(product[0].imagePaths[i]);

				imageUrls.push(publicUrlObj.publicUrl);
				// console.log(imageUrls);
			}
		}
	}

	// console.log(product ? product[0] : "null");

	return (
		<div className="flex flex-col gap-4">
			<div className="">
				<BackButton />
			</div>

			{product && product.length ? (
				<div
					className="flex flex-col w-full justify-center gap-6 
													md:flex-row"
				>
					<div className="self-center">
						{imageUrls.length &&
							imageUrls.map((url, index) => (
								<Image
									key={index}
									src={url}
									alt={`${product[0].slug}-image`}
									width={450}
									height={300}
									className="rounded-md"
								/>
							))}
					</div>
					<div className="md:w-2/3">
						<div className="flex flex-col gap-4">
							<h2 className="font-bold text-5xl">{product[0].name}</h2>
							<h3 className="font-semibold text-xl">
								Category: {product[0].product_category.category_name}
								<Link
									href={`/products?category=${product[0].product_category.category_name.toLowerCase()}`}
								>
									<span className="underline">{product[0].category}</span>
								</Link>
							</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</div>
				</div>
			) : (
				<div>No product found.</div>
			)}
		</div>
	);
}
