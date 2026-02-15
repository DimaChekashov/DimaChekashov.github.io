import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  type?: "primary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  className?: string;
}

export const Button = ({
  children,
  htmlType = "button",
  type = "primary",
  onClick,
  disabled,
  href,
  className,
}: ButtonProps) => {
  const buttonClassName = classNames(
    "cursor-pointer rounded-md py-2 px-4",
    disabled && "opacity-50 cursor-not-allowed",
    type === "primary" &&
      "bg-primary-blue hover:bg-primary-dark-blue active:bg-primary-darker-blue",
    type === "danger" &&
      "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
    className,
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
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
    >
      {children}
    </button>
  );
};
