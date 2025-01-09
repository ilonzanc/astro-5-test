import { useUserStore } from "../lib/stores/useUserStore";
import { Button } from "../lib/ui/Button";

export default function AuthNav() {
  const authenticatedUser = useUserStore((state) => state.authenticatedUser);
  const logout = useUserStore((state) => state.logout);

  const renderContent = () => {
    if (authenticatedUser) {
      return (
        <>
          Logged in: {authenticatedUser.username}{" "}
          <Button as="button" onClick={() => logout()}>
            Logout
          </Button>
        </>
      );
    }
    return <a href="/login">Login</a>;
  };

  return <div className="auth">{renderContent()}</div>;
}
