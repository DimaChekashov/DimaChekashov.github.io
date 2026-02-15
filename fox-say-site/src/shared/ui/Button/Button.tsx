import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  type?: "primary" | "danger" | "warning" | "success" | "info";
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
    type === "warning" &&
      "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-black",
    type === "danger" &&
      "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
    type === "success" &&
      "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white",
    type === "info" &&
      "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
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
