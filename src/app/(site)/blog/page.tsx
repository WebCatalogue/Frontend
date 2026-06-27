import Link from "next/link";
import { PageHeader, PageSection } from "@/components/layout";
import { Reveal } from "@/components/playground/motion/primitives";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/mock/blog";

export const metadata = {
  title: "Blog — Aurevia",
  description: "Design tips, SEO guides, and insights for local businesses.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights for growing businesses."
        description="Practical advice on design, SEO, and building a premium online presence."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <PageSection>
        <Reveal>
          <p className="type-label text-foreground-subtle mb-6">Categories</p>
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className="type-body-sm text-foreground-muted hover:bg-muted hover:text-foreground rounded-full border border-[var(--color-border-subtle)] px-4 py-2 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <article className="depth-panel group p-7 sm:p-8">
                <Link href={`/blog/${post.categorySlug}/${post.slug}`}>
                  <p className="type-label text-accent">{post.category}</p>
                  <h2 className="type-heading-md text-foreground group-hover:text-accent mt-3 transition-colors">
                    {post.title}
                  </h2>
                  <p className="type-body-sm text-foreground-muted mt-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="type-body-sm text-foreground-subtle mt-4">
                    {post.author} · {post.readTime} ·{" "}
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </>
  );
}
