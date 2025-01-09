import { ContentfulUserConnector } from "../connectors/ContentfulUserConnector";

class UserService {
  readonly contentfulConnector;
  constructor() {
    this.contentfulConnector = new ContentfulUserConnector();
  }

  async isRegisteredUser(userEmail: string) {
    try {
      const user = await this.contentfulConnector.getUserByEmail(userEmail);
      return user && user.fields;
    } catch (error) {
      console.error(error);
    }
  }

  async registerUser(userData: User) {
    try {
      const newUser = await this.contentfulConnector.createUser(userData);
      return newUser;
    } catch (error) {
      console.error(error);
    }
  }
}

export { UserService };
