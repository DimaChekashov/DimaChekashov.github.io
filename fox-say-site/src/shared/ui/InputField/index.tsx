interface InputFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  type: "text" | "password" | "email";
  required?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  id,
  label,
  placeholder,
  onChange,
  required,
  type,
  error,
  ...props
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className="border border-gray-300 rounded-md p-2"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        {...props}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
