import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

// imageNames are store in an array, but only use the first image for the banner
// project names will have space, replace space with "-" to fetch the corresponding images
export default async function ProjectBanner({
	projectName,
	projectDescription,
	projectCountry,
	projectCity,
	bannerImagePath,
	projectSlug,
}: {
	projectName: string;
	projectDescription: string;
	projectCountry: string;
	projectCity?: string;
	bannerImagePath?: string;
	projectSlug: string;
}) {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore as any); //work around for now

	const { data: imagePath } = await (await supabase).storage
		.from("unihom-site")
		.getPublicUrl(`${bannerImagePath || "project/project-1.png"}`);

	return (
		<Link
			href={`/projects/${projectSlug}`}
			className="flex flex-col gap-4 transition-all duration-200 rounded-md
										md:flex-row
										hover:shadow-[0px_0px_10px_5px_rgba(255,255,255,0.7)]"
		>
			<div className="md:w-1/3 flex justify-center items-center">
				{bannerImagePath ? (
					<Image
						className="rounded-t-md md:rounded-l-md grow"
						width={600}
						height={100}
						alt={``}
						src={imagePath.publicUrl}
					/>
				) : (
					<Image
						width={400}
						height={400}
						alt={``}
						src={""}
					/>
				)}
			</div>
			<div className="md:w-2/3 flex flex-col gap-2 p-2">
				<h3 className="font-semibold text-2xl h-1/4">{projectName}</h3>
				<p className="line-clamp-4 text-lg self-center">{projectDescription}</p>
				<p className="grow flex justify-start items-end text-lg h-1/4">
					Location: {projectCity && `${projectCity}, `} {projectCountry}
				</p>
			</div>
		</Link>
	);
}
