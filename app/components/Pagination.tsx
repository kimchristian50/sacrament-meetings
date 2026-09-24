'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="flex justify-center items-center gap-4 mt-8">
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-4 py-2 border rounded-md dark:border-gray-700 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
                    }`}
            >
                Previous
            </Link>

            <span className="text-sm">
                Page {currentPage} of {totalPages}
            </span>

            <Link
                // if you are on page 1 with search "react", currentPage + 1 becomes 2.
                // createPageURL(2) builds "/projects?query=react&page=2"
                // clicking Next updates the URL bar without reloading the whole page.
                // Next.js catches the URL update and re-runs app/projects/page.tsx on the server with page=2.
                href={createPageURL(currentPage + 1)}
                className={`px-4 py-2 border rounded-md dark:border-gray-700 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
                    }`}
            >
                Next
            </Link>
        </nav>
    );
}