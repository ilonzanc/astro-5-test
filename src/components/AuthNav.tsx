import { useUserStore } from "../lib/stores/useUserStore";

export default function AuthNav() {
  const authenticatedUser = useUserStore((state) => state.authenticatedUser);
  const logout = useUserStore((state) => state.logout);

  return (
    <div className="auth">
      {authenticatedUser
        ? `Logged in: ${authenticatedUser.username}`
        : "Not logged in"}

      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
