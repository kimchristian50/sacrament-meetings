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
                // exact match for Home and All Meetings
                let isActive = pathname === item.href;

                // if we are on a meeting detail page (like /meetings/1), highlight "Current Sunday"
                if (item.href === '/meetings/current' && (pathname === '/meetings/current' || (pathname.startsWith('/meetings/') && pathname !== '/meetings'))) {
                    isActive = true;
                }

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