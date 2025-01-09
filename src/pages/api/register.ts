export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from "astro";
import { UserService } from "../../lib/services/UserService";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const username = data.get("username") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  // Validate the data - you'll probably want to do more than this
  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  const userService = new UserService();

  const errors: { username?: string; email?: string; password?: string } = {};

  try {
    if (await userService.isRegisteredUser(email)) {
      errors.email = "Email is already registered";
    }
    // Do something with the data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  const createResponse = await userService.registerUser({
    username,
    email,
    password,
  });

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      formData: data,
      errors,
    }),
    { status: 200 }
  );
};
