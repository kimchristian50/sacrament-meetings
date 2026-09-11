'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define your navigation links in an array
const navItems = [
    { name: 'Home', href: '/' },
    { name: 'All Meetings', href: '/meetings' },
    { name: 'Current Sunday', href: '/meetings/current' },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-1 sm:gap-2" >
            {navItems.map((item) => {
                // check if the current route matches the link destination
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${isActive
                            ? 'bg-slate-700 text-white font-semibold shadow-sm' // Active link style
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50' // Inactive link style
                            }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}