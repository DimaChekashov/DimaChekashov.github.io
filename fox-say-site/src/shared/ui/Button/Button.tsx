import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

export const Button = ({
  children,
  type = "button",
  onClick,
  disabled,
  href,
}: ButtonProps) => {
  const className = classNames(
    "bg-primary-blue cursor-pointer rounded-md py-2 px-4 hover:bg-primary-dark-blue active:bg-primary-darker-blue",
    disabled && "opacity-50 cursor-not-allowed",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};
