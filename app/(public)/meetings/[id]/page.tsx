//app/meetings/[id]/page.tsx
import { notFound } from 'next/navigation';
// import type { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '../../../components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic'; // force this to be run every time the page is viewed

// define the blueprint for the props Next.js will inject
interface PageProps {
    params: Promise<{ id: string }>;
}

// tell the component function to expect that PageProps object
export default async function MeetingDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    // resolve the promise and extract 'id' ('1', '2', etc.)
    const id = Number(resolvedParams.id);

    if (Number.isNaN(id)) {
        notFound();
    }

    // call DB function
    const meeting = await getMeetingById(id);

    if (!meeting) {
        notFound();
    }

    return (
        <div>
            <MeetingDetail meeting={meeting} />
        </div>
    );
}