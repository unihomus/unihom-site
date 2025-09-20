import { ProductType } from "@/types/myTypes";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function ProductCard({
	product,
}: {
	product: ProductType;
}) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore as any); //work around for now

	const { data: imageUrlObj } = await (await supabase).storage
		.from("unihom-site")
		.getPublicUrl(product.imagePaths[0]);

	return (
		<div
			className="flex flex-col justify-center items-center relative gap-2 rounded-md transition-all group
									"
		>
			<Image
				src={imageUrlObj.publicUrl}
				width={300}
				height={350}
				alt={product.slug + "-image"}
				className="flex-auto rounded-md h-100"
			/>
			<div
				className="flex flex-col justify-center items-center absolute bottom-0 bg-white/80 text-black w-full rounded-b-md h-0 overflow-hidden transition-all duration-200
												group-hover:h-10
													group-focus-visible:h-10"
			>
				<p>{product.name}</p>
			</div>
		</div>
	);
}
