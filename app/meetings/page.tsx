// app/meetings/page.tsx
import type { SacramentMeeting } from '@/lib/types';
import MeetingCard from '../components/MeetingCard';

// Opt out of static caching so fresh data is always cached
export const dynamic = 'force-dynamic';

async function getMeetings(): Promise<SacramentMeeting[]> {
    // use relative URL on server via process.env or absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // fetch the data
    const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch meetings');
    }
    return res.json();
}

export default async function MeetingsPage() {
    const meetings = await getMeetings();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Scheduled Meetings</h1>
                <span className="text-sm text-slate-500">{meetings.length} Total Meetings</span>
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
        </div>
    );
}
