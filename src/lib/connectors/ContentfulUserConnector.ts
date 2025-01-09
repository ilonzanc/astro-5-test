import type { ContentfulClientApi } from "contentful";
import { deliveryClient, managementClient } from "../contentful";

class ContentfulUserConnector {
  readonly deliveryClient;
  readonly managementClient;
  constructor() {
    this.deliveryClient = deliveryClient;
    this.managementClient = managementClient;
  }

  async getUserByEmail(userEmail: string) {
    try {
      const data = await this.deliveryClient.getEntries({
        limit: 1,
        content_type: "user",
        "fields.email": userEmail,
      });
      return data.items[0];
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(userData: User) {
    const managementClient = await this.managementClient();

    const data = await managementClient.createEntry("user", {
      fields: {
        username: {
          "en-US": userData.username,
        },
        email: {
          "en-US": userData.email,
        },
        password: {
          "en-US": userData.password,
        },
      },
    });
  }
}

export { ContentfulUserConnector };
