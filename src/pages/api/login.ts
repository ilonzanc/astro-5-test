export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from "astro";
import { UserService } from "../../lib/services/UserService";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  // Validate the data - you'll probably want to do more than this
  if (!email || !password) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  const userService = new UserService();

  const errors: { email?: string; password?: string } = {};

  const response = await userService.loginUser({
    email,
    password,
  });

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      authenticatedUser: {
        username: response?.fields.username,
        email: response?.fields.email,
      },
      formData: data,
      errors,
    }),
    { status: 200 }
  );
};
