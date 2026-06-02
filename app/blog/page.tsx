// app/blog/page.tsx

import { client, urlFor, ALL_POSTS_QUERY, ALL_CATEGORIES_QUERY } from "@/lib/sanity";
import type { Post, Category } from "@/lib/sanity";
import BlogClient from "./BlogClient";

export const revalidate = 60; // ISR — refresh every 60 seconds

export default async function BlogPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    client.fetch(ALL_POSTS_QUERY),
    client.fetch(ALL_CATEGORIES_QUERY),
  ]);

  return <BlogClient posts={posts} categories={categories} urlFor={urlFor} />;
}
