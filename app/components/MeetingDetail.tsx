// components/MeetingDetail.tsx
import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    return (
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-6 sm:p-10 shadow-sm print:shadow-none print:border-none print:p-0">

            {/* Program Header */}
            <div className="text-center border-b border-gray-200 pb-6 mb-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 rounded-full mb-3">
                    {meeting.meetingType} Meeting
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
                    Sacrament Meeting Program
                </h2>
                <p className="text-gray-600 font-medium">{meeting.date}</p>

                <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
                    <p><span className="font-semibold">Presiding:</span> {meeting.presiding}</p>
                    <p><span className="font-semibold">Conducting:</span> {meeting.conducting}</p>
                </div>
            </div>

            {/* Announcements (Optional) */}
            {meeting.announcements && meeting.announcements.length > 0 && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r">
                    <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide mb-2">
                        Announcements
                    </h3>
                    <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        {meeting.announcements.map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Agenda Items */}
            <div className="space-y-6 text-gray-800">

                {/* Opening Section */}
                <div className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between py-1">
                        <span className="font-medium text-gray-600">Opening Hymn</span>
                        <span className="font-semibold text-right">#{meeting.openingHymn.number} - {meeting.openingHymn.title}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="font-medium text-gray-600">Invocation</span>
                        <span className="font-semibold text-right">{meeting.openingPrayer}</span>
                    </div>
                </div>

                {/* Ward & Stake Business */}
                {(meeting.wardBusiness.length > 0 || meeting.stakeBusiness) && (
                    <div className="border-b border-gray-100 pb-4 bg-gray-50 p-3 rounded">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Ward & Stake Business</h4>
                        {meeting.stakeBusiness && (
                            <p className="text-sm italic text-blue-700 mb-1">Stake Business conducted</p>
                        )}
                        {meeting.wardBusiness.map((item, idx) => (
                            <p key={idx} className="text-sm text-gray-700">• {item.description}</p>
                        ))}
                    </div>
                )}

                {/* Sacrament Service */}
                <div className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between py-1">
                        <span className="font-medium text-gray-600">Sacrament Hymn</span>
                        <span className="font-semibold text-right">#{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</span>
                    </div>
                    <p className="text-xs text-center italic text-gray-500 mt-2">Administration of the Sacrament</p>
                </div>

                {/* Speakers & Musical Numbers */}
                <div className="border-b border-gray-100 pb-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Program Speakers & Messages</h4>
                    <div className="space-y-3">
                        {meeting.speakers.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-baseline py-1">
                                <div>
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    {item.topic && <p className="text-xs text-gray-500 italic">{item.topic}</p>}
                                </div>
                                <span className="text-xs uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                    {item.type === 'musical-number' ? 'Special Music' : 'Speaker'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Closing Section */}
                <div>
                    <div className="flex justify-between py-1">
                        <span className="font-medium text-gray-600">Closing Hymn</span>
                        <span className="font-semibold text-right">#{meeting.closingHymn.number} - {meeting.closingHymn.title}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span className="font-medium text-gray-600">Benediction</span>
                        <span className="font-semibold text-right">{meeting.closingPrayer}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}