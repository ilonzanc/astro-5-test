import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.DEV
    ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
    : (process.env.CONTENTFUL_DELIVERY_TOKEN as string),
  host: process.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
