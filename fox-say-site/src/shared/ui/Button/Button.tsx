import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ children, type, onClick, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "bg-primary-blue cursor-pointer rounded-md py-2 px-4 hover:bg-primary-dark-blue active:bg-primary-darker-blue",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
};
