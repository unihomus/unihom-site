import ProjectBanner from "@/components/ProjectBanner";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ProjectsPage() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore as any); //work around for now

	const { data: projects, error } = await (await supabase)
		.from("projects")
		.select("*")
		.order("name", { ascending: true });

	// console.log(projects);

	return (
		<div className="flex flex-col gap-12">
			<h1 className="text-3xl font-semibold">Projects</h1>
			{projects?.length ? (
				projects?.map((project) => (
					<ProjectBanner
						key={project.id}
						projectName={project.name}
						projectCountry={project.country}
						projectDescription={project.description}
						projectCity={project.city ? project.city : null}
						bannerImagePath={project.image_path[0]}
						projectSlug={project.slug}
					/>
				))
			) : (
				<p>No project is found.</p>
			)}
		</div>
	);
}
