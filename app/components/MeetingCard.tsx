// components/MeetingCard.tsx
import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';
import DeleteMeetingButton from './DeleteMeetingButton';

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            {/* Top Header: Date and Meeting Type Badge */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                    {meeting.date}
                </h3>

                {/* Badge styling based on meeting type */}
                <span className="capitalize px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {meeting.meetingType}
                </span>
            </div>

            {/* Conducting & Presiding Metadata */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p><span className="font-medium text-gray-800">Presiding:</span> {meeting.presiding}</p>
                <p><span className="font-medium text-gray-800">Conducting:</span> {meeting.conducting}</p>
            </div>

            {/* Action Link to Single Meeting Detail */}
            <Link
                href={`/meetings/${meeting.id}`}
                className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
                View Program &rarr;
            </Link>
            {/* Delete Form */}
            <div className="flex items-center justify-between mt-2">
                <DeleteMeetingButton id={meeting.id} />
            </div>
        </div>
    );
}
