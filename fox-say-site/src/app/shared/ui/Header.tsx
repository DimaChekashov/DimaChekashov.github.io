import Link from "next/link";
import React from "react";

const linkClass = "hover:text-blue-500";

const Header: React.FC = () => {
    return (
        <header className="mb-10 flex justify-between p-4 border-b border-gray-200">
            <div>Fox Say Logo</div>
            <nav>
                <ul className="flex gap-4">
                    <li><Link href="/" className={linkClass}>Home</Link></li>
                    <li><Link href="/blog" className={linkClass}>Blog</Link></li>
                    <li><Link href="/portfolio" className={linkClass}>Portfolio</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
