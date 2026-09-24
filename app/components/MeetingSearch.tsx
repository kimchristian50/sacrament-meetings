'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        // always reset to page 1 on a new search
        params.set('page', '1'); 
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        // update the browser URL after the user stops typing for 300 ms
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <input
            type="search"
            placeholder="Search by speaker, leader, or meeting type..."
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search meetings"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
    );
}