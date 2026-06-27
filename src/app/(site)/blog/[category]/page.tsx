import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import { ROUTES } from "@/constants";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/mock/blog";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);
  return {
    title: cat ? `${cat.name} — Blog — BhaiKISite` : "Blog — BhaiKISite",
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const posts = BLOG_POSTS.filter((p) => p.categorySlug === category);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={cat.name}
        breadcrumbs={[
          { label: "Blog", href: ROUTES.blog },
          { label: cat.name },
        ]}
      />

      <PageSection>
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <article className="depth-panel p-7">
                <Link href={`/blog/${category}/${post.slug}`}>
                  <h2 className="type-heading-md text-foreground hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="type-body-sm text-foreground-muted mt-3">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="type-body-md text-foreground-muted">No posts yet.</p>
        )}
      </PageSection>
    </>
  );
}
