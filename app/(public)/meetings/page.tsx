// app/(public)/meetings/page.tsx
import MeetingCard from '../../components/MeetingCard';
import { getMeetings, getMeetingsTotalPages } from '../../../lib/meetings-db';
import { Pagination } from '../../components/Pagination';
import { MeetingSearch } from '../../components/MeetingSearch';
import Link from 'next/link';


// Opt out of static caching so fresh data is always cached
export const dynamic = 'force-dynamic';

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) || 1;

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Scheduled Meetings</h1>
                <span className="text-xl text-slate-900">
                    <Link href="/meetings/new" className="...">
                        + New Meeting
                    </Link>
                </span>
            </div>

            <div className="max-w-md mx-auto mb-8">
                <MeetingSearch />
            </div>

            {meetings.length === 0 ? (
                <p className="text-slate-500 italic">No meetings found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}
            <Pagination totalPages={totalPages} />
        </div>
    );
}
