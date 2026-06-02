// sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "readTime", title: "Read Time (mins)", type: "number" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
        },
      ],
    }),
    defineField({ name: "featured", title: "Featured post?", type: "boolean" }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "coverImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : "", media };
    },
  },
});