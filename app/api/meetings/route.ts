// /app/api/meetings/route.ts
import { getMeetings } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    // extract URL query parameters (e.g. ?date)
    const date = new URL(request.url).searchParams.get('date');

    // Fetch filtered or full list from database
    const meetingList = getMeetings(date);
    return NextResponse.json(meetingList);
}