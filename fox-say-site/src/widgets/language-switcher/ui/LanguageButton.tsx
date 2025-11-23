interface LanguageButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export const LanguageButton = ({
  label,
  disabled,
  onClick,
}: LanguageButtonProps) => {
  return (
    <button
      type="button"
      className="cursor-pointer disabled:text-primary-blue disabled:cursor-not-allowed [:not(:disabled)]:hover:opacity-80"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
