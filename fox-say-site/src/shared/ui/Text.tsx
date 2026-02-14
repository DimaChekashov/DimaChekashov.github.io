import classNames from "classnames";

interface TextProps {
  children: React.ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}

const textStyles = {
  p: "text-base text-body",
  span: "text-sm text-body",
  div: "text-base text-body",
};

export const Text = ({
  children,
  as: Component = "p",
  className = "",
}: TextProps) => {
  const textClasses = classNames(textStyles[Component], className);

  return <Component className={textClasses}>{children}</Component>;
};
