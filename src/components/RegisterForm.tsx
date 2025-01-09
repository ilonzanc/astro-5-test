import { useState } from "react";
import { Button } from "../lib/ui/Button";
import type { FormEvent } from "react";

export default function RegisterForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (
      data.errors &&
      Object.values(data.errors).some((v) => v !== undefined)
    ) {
      setErrors(data.errors);
      setResponseMessage("");
    } else {
      setErrors({
        username: "",
        email: "",
        password: "",
      });
      setResponseMessage("User created");
    }
  };

  return (
    <form method="POST" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your unique username"
            required
          />
          {errors.username && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.username}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your emailaddress"
            required
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="****** "
            required
          />
        </div>
      </div>

      <Button as="button" type="submit">
        Register
      </Button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
