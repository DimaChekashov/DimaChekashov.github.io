import classNames from "classnames";

interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const headingStyles = {
  h1: "text-4xl md:text-5xl font-bold",
  h2: "text-3xl md:text-4xl font-semibold",
  h3: "text-2xl md:text-3xl font-semibold",
  h4: "text-xl md:text-2xl font-medium",
  h5: "text-lg md:text-xl font-medium",
  h6: "text-base md:text-lg font-medium",
};

export const Heading = ({
  children,
  as: Component = "h1",
  className = "",
}: HeadingProps) => {
  const headingClasses = classNames(
    "text-heading",
    headingStyles[Component],
    className,
  );

  return <Component className={headingClasses}>{children}</Component>;
};
