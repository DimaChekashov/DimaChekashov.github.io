import { Link } from "@/app/i18n/navigation";

export function Button({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="button-primary">
      {children}
    </Link>
  );
}
