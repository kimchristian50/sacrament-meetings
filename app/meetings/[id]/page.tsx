//app/meetings/[id]/page.tsx
import { notFound } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '../../components/MeetingDetail';

export const dynamic = 'force-dynamic'; // force this to be run every time the page is viewed

// define the blueprint for the props Next.js will inject
interface PageProps {
    params: Promise<{ id: string }>;
}

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: 'no-store' });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error('Failed to fetch meeting');
    }

    return res.json();
}

// tell the component function to expect that PageProps object
export default async function MeetingDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    // resolve the promise and extract 'id' ('1', '2', etc.)
    const meeting = await getMeeting(resolvedParams.id);

    if (!meeting) {
        notFound();
    }

    return (
        <div>
            <MeetingDetail meeting={meeting} />
        </div>
    );
}