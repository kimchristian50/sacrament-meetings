// app/meetings/current/page.tsx
import { redirect, notFound } from 'next/navigation';
import { getMeetings, getAllMeetingDates } from '@/lib/meetings-db';

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

export default async function CurrentMeetingPage() {
    const sundayDate = getMostRecentSunday();
    const allMeetings = await getAllMeetingDates();

    // find meeting by date directly from array
    let meeting = allMeetings.find((m) => m.date === sundayDate);

    // Fallback: find the closest meeting to today's Sunday
    if (!meeting && allMeetings.length > 0) {
        const sorted = [...allMeetings].sort((a, b) =>
            Math.abs(new Date(a.date).getTime() - new Date(sundayDate).getTime()) -
            Math.abs(new Date(b.date).getTime() - new Date(sundayDate).getTime())
        );
        meeting = sorted[0];
    }

    if (!meeting) {
        notFound();
    }

    // Perform server-side redirect to the meeting detail route
    redirect(`/meetings/${meeting.id}`);
}