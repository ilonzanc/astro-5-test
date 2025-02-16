import { forwardRef, type ReactNode } from "react";

type ButtonProps = {
  outlined?: boolean;
  children?: React.ReactNode;
  className?: string;
  as: "button" | "a";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  function ForwardedButton(props, ref) {
    const {
      outlined,
      children,
      className,
      as: Component = "a",
      onClick,
      ...rest
    } = props;
    const btnProps = { ...ref, ...rest };

    return (
      <Component
        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        {...(onClick && onClick)}
        {...btnProps}
      >
        {/* some other components here */}
        {children}
      </Component>
    );
  }
);

export { Button };
