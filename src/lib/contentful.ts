import { createClient as deliveryCreateClient } from "contentful";
import pkg from "contentful-management";

const deliveryClient = deliveryCreateClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.DEV
    ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
    : (process.env.CONTENTFUL_DELIVERY_TOKEN as string),
  host: process.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

const { createClient } = pkg;

const managementBaseClient = createClient({
  accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_TOKEN as string,
});

const managementClient = () => {
  return managementBaseClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID as string)
    .then((space) => space.getEnvironment("master"));
};

export { deliveryClient, managementClient };
