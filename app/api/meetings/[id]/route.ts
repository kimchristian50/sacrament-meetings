// /app/api/meetings/[id]/route.ts
import { getMeetingById } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // 1. await params to get the id (Next.js 15 requirement)
    const resolvedParams = await params; // await the params Promise

    // 2. convert id to a Number: Number(rawId)
    const id = Number(resolvedParams.id);

    // 3. Check Number.isNaN(id) -> return Response.json({ error: 'Invalid ID' }, { status: 400 })
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    // 4. Get meeting with getMeetingById(id)
    const meeting = getMeetingById(id);

    // 5. If !meeting -> return Response.json({ error: 'Not Found' }, { status: 404 })
    if (!meeting) {
        return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    // 6. Return Response.json(meeting)
    return NextResponse.json(meeting, { status: 200 });
}