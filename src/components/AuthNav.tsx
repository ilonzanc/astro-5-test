import { useUserStore } from "../lib/stores/useUserStore";

export default function AuthNav() {
  const authenticatedUser = useUserStore((state) => state.authenticatedUser);
  const login = useUserStore((state) => state.login);

  return (
    <div className="auth">
      {authenticatedUser
        ? `Logged in: ${authenticatedUser.username}`
        : "Not logged in"}

      <button
        onClick={() =>
          login({ username: "peepeepoopoo", email: "email@mail.be" })
        }
      >
        Login
      </button>
    </div>
  );
}
