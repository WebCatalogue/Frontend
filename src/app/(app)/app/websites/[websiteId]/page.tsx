import { redirect } from "next/navigation";

interface WebsitePageProps {
  params: Promise<{ websiteId: string }>;
}

export default async function WebsiteDetailRedirect({
  params,
}: WebsitePageProps) {
  const { websiteId } = await params;
  redirect(`/app/websites/${websiteId}/builder`);
}
