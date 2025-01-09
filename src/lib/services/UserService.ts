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
    console.log(credentials);
    try {
      const user = await this.contentfulConnector.getUserByEmail(
        credentials.email
      );
      if (!user) {
        console.log("User not found");
        return;
      }
      console.log("User found");

      try {
        await bcrypt.compare(credentials.password, user.fields.password);
        console.log("password matched");
        return user;
      } catch (error) {
        console.log("password not a match");
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
