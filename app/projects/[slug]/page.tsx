import { getData } from "@/lib/getData";
import ProjectPageClient from "./components/project-page-client";

// At the top of the file, keep the server component logic
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
	const data = await getData();
	return (data?.projects ?? [])
		.filter((p: any) => p.slug && typeof p.slug === "string")
		.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const data = await getData();
	const project = data?.projects?.find((p: any) => p.slug === slug);
	if (!project) return { title: "Project Not Found" };
	return {
		title: `${project.title} — Shakur Portfolio`,
		description: project.description,
	};
}

// Main page component (server component wrapper)
export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const data = await getData();
	const project = data?.projects?.find((p: any) => p.slug === slug);
	if (!project) notFound();

	return <ProjectPageClient project={project} />;
}
