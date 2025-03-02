import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    return (
        <header className="mb-10 flex justify-between p-4">
            <div>Fox Say Logo</div>
            <nav>
                <ul className="flex gap-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/portfolio">Portfolio</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;