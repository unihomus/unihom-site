import BackButton from "@/components/BackButton";
import { ProjectType, ProductType } from "@/types/myTypes";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function IndividualProject({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore as any); //work around for now
	const { slug } = await params;

	let currentProject: ProjectType = {
		id: 0,
		name: "",
		image_path: [],
		description: "",
		city: "",
		country: "",
	};

	const projectImageUrls: string[] = [];
	let productsUsed: ProductType[] = [];

	const { data: project } = await (await supabase)
		.from("projects")
		.select("*")
		.eq("slug", slug);

	if (project?.length) {
		currentProject = { ...project[0] };

		// get all project images
		for (let i = 0; i < currentProject.image_path.length; i++) {
			const { data: imageUrlObj } = (await supabase).storage
				.from("unihom-site")
				.getPublicUrl(currentProject.image_path[i]);
			projectImageUrls.push(imageUrlObj.publicUrl);
		}

		const { data: products } = await (await supabase)
			.from("products")
			.select("*")
			.eq("project_id", currentProject.id);

		// get all related product images
		if (products?.length) {
			productsUsed = [...products];
			for (let i = 0; i < products?.length; i++) {
				const { data: imageUrlObj } = (await supabase).storage
					.from("unihom-site")
					.getPublicUrl(products[i].imagePaths[0]);
				productsUsed[i].imagePaths[0] = imageUrlObj.publicUrl;
			}
		}
	}

	console.log(productsUsed);

	return (
		<div className="flex flex-col gap-8">
			<BackButton />
			{project?.length ? (
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-semibold">{currentProject.name}</h1>
					{projectImageUrls.map((url, index) => (
						<Image
							key={index}
							src={url}
							width={400}
							height={400}
							alt={`${slug}-image-${index}`}
						/>
					))}
					<p className="text-lg">{currentProject.description}</p>
					<hr className="" />
					<p className="text-xl">Products Used</p>
					<div className="flex flex-row gap-4 justify-start items-end">
						{productsUsed.map((product) => (
							<Link
								key={product.id}
								href={`/products/${product.slug}`}
								className="flex flex-col gap-2"
							>
								<Image
									src={product.imagePaths[0]}
									className="rounded-md
															hover:scale-[1.05] transition-all duration-200"
									width={100}
									height={100}
									alt={`${product.slug}-image`}
								/>
								<p className="flex justify-center items-center">
									{product.name}
								</p>
							</Link>
						))}
					</div>
				</div>
			) : (
				<div>project does not exist.</div>
			)}
		</div>
	);
}
