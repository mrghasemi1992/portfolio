import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudy from "@/components/case-study";
import Footer from "@/components/footer";
import JsonLd from "@/components/json-ld";
import Nav from "@/components/nav";
import PageTransition from "@/components/page-transition";
import { SITE_URL, getProject, profile, projects } from "@/data";

type Props = {
  params: Promise<{ slug: string }>;
};

// Every case study is built ahead of time; other slugs are a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} case study`;
  const url = `/work/${project.slug}`;
  return {
    title,
    description: project.intro,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${title} | ${profile.name}`,
      description: project.intro,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description: project.intro,
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const code = project.links.find((l) => l.label === "Code");
  const live = project.links.find((l) => l.label === "Live site");
  const structured = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.intro,
    url: `${SITE_URL}/work/${project.slug}`,
    keywords: project.stack.join(", "),
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    ...(code && { codeRepository: code.href }),
    ...(live && { sameAs: live.href }),
    ...(project.status && { creativeWorkStatus: project.status }),
  };

  return (
    <>
      <JsonLd data={structured} />
      <Nav />
      <PageTransition>
        <main id="main">
          <CaseStudy project={project} next={next} />
        </main>
      </PageTransition>
      <Footer topHref="#main" />
    </>
  );
}
