import { ContentfulUserConnector } from "../connectors/ContentfulUserConnector";
import bcrypt from "bcryptjs";

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

  async loginUser(credentials: { email: string; password: string }) {
    try {
      const user = await this.contentfulConnector.getUserByEmail(
        credentials.email
      );
      if (!user) {
        console.error("User not found");
        return;
      }

      try {
        await bcrypt.compare(credentials.password, user.fields.password);
        return user;
      } catch (error) {
        console.error("password not a match");
        return;
      }
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
