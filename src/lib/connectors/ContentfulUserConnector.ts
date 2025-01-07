import type { ContentfulClientApi } from "contentful";
import { contentfulClient } from "../contentful";

class ContentfulUserConnector {
  readonly contentfulClient;
  constructor() {
    this.contentfulClient = contentfulClient;
  }

  async getUserByEmail(userEmail: string) {
    try {
      const data = await contentfulClient.getEntries({
        limit: 1,
        content_type: "user",
        "fields.email": userEmail,
      });
      return data.items[0];
    } catch (error) {
      console.error(error);
    }
  }

  createUser() {}
}

export { ContentfulUserConnector };
