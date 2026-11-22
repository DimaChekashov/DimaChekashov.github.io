import classNames from "classnames";

interface TextProps {
  children: React.ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}

const textStyles = {
  p: "text-base text-foreground",
  span: "text-sm text-foreground",
  div: "text-base text-foreground",
};

export const Text = ({
  children,
  as: Component = "p",
  className = "",
}: TextProps) => {
  const textClasses = classNames(textStyles[Component], className);

  return <Component className={textClasses}>{children}</Component>;
};
