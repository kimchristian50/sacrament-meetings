// app/meetings/current/page.tsx
import { redirect, notFound } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';

// force Next.js to run this script live on the server every time someone visits the page, so "next Sunday" is current
export const dynamic = 'force-dynamic';

// Helper function to format a Date object as YYYY-MM-DD
function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

// Helper function to calculate the most recent Sunday (or today if today is Sunday)
function getMostRecentSunday(): string {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
    return formatDate(sunday);
}

// fetch data 
async function getMeetingByDate(dateStr: string): Promise<SacramentMeeting | null> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/meetings?date=${dateStr}`, { cache: 'no-store' });

    if (!res.ok) {
        return null;
    }

    const meetings: SacramentMeeting[] = await res.json();
    return meetings.length > 0 ? meetings[0] : null;
}

export default async function CurrentMeetingPage() {
    const sundayDate = getMostRecentSunday();
    let meeting = await getMeetingByDate(sundayDate);

    // Fallback: If no meeting exists for the calculated Sunday, fetch all meetings and pick the first available
    if (!meeting) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
        if (res.ok) {
            const allMeetings: SacramentMeeting[] = await res.json();
            if (allMeetings.length > 0) {
                meeting = allMeetings[0];
            }
        }
    }

    if (!meeting) {
        notFound();
    }

    // Perform server-side redirect to the meeting detail route
    redirect(`/meetings/${meeting.id}`);
}