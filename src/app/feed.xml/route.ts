import { getPublishedArticles } from "@/lib/db/articles";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const publishedArticles = await getPublishedArticles(50);

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${publishedArticles
      .map(
        (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteConfig.url}/article/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteConfig.url}/article/${article.slug}</guid>
      <category>${escapeXml(article.category.name)}</category>
      <author>${escapeXml(article.author.name)}</author>
      <media:content url="${article.image}" medium="image"/>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
