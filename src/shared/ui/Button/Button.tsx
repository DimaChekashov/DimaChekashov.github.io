import { Link } from "@/app/i18n/navigation";

export function Button({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="rounded-md bg-link px-4 py-2 font-semibold text-white hover:bg-link-hover">
      {children}
    </Link>
  );
}
