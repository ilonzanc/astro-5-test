import type { ContentfulClientApi } from "contentful";
import { deliveryClient, managementClient } from "../contentful";
import bcrypt from "bcryptjs";

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

    const query: ContentfulQuery = { fields: {} };

    Object.keys(userData).map((inputName) => {
      if (inputName === "password") {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userData[inputName], salt);
        query.fields[inputName] = { "en-US": hash };
      } else {
        query.fields[inputName] = {
          "en-US": userData[inputName as keyof typeof userData],
        };
      }
    });

    const data = await managementClient.createEntry("user", query);

    return data;
  }
}

export { ContentfulUserConnector };
