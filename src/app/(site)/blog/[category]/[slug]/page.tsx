import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, PageSection } from "@/components/layout";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { BLOG_POSTS } from "@/mock/blog";

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — BhaiKISite` : "Article — BhaiKISite",
    description: post?.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const post = BLOG_POSTS.find(
    (p) => p.slug === slug && p.categorySlug === category,
  );
  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Blog", href: ROUTES.blog },
          { label: post.category, href: `/blog/${category}` },
          { label: post.title },
        ]}
      />

      <PageSection>
        <article className="prose-custom mx-auto max-w-3xl">
          <p className="type-body-sm text-foreground-subtle mb-8">
            By {post.author} · {post.readTime} read ·{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="space-y-5">
            <p className="type-body-lg text-foreground-muted">{post.excerpt}</p>
            <p className="type-body-md text-foreground-muted">
              This is a placeholder article layout. Full content will be added
              when the blog CMS is connected. The structure supports rich text,
              images, and embedded media for future publishing.
            </p>
            <p className="type-body-md text-foreground-muted">
              Local businesses that invest in premium web design consistently
              see higher engagement, better search rankings, and more qualified
              inquiries. We&apos;ll explore these topics in depth across our
              upcoming articles.
            </p>
          </div>
        </article>
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href={`/blog/${category}`}>← Back to {post.category}</Link>
          </Button>
        </div>
      </PageSection>
    </>
  );
}
