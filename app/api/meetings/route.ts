// /app/api/meetings/route.ts
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // extract URL query parameters (e.g. ?date)
    // use '??' to default to '' or '1' if the parameter is null
    const query = searchParams.get('query') ?? searchParams.get('date') ?? '';
    const page = Number(searchParams.get('page')) || 1;

    // Fetch filtered list and total pages from database
    const meetingList = await getMeetings(query, page);
    const totalPages = await getMeetingsTotalPages(query);

    return NextResponse.json({
        meetings: meetingList,
        totalPages,
    });
}