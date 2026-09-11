import type { SacramentMeeting } from './types';

export const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-9-13',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: '', type: 'musical-number' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Ward temple night: September 29']
    },
    {
        id: 2,
        date: '2026-09-20',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Anderson',
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
        openingPrayer: 'Sister Martinez',
        wardBusiness: [
            { description: 'Release of Brother Taylor as Sunday School teacher' },
            { description: 'Sustaining of Brother Clark as Sunday School teacher' }
        ],
        stakeBusiness: false,
        sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
        speakers: [
            { name: 'Bearing of Testimonies', topic: 'Fast & Testimony Meeting', type: 'speaker' }
        ],
        closingHymn: { number: 301, title: 'I Am a Child of God' },
        closingPrayer: 'Brother Johnson',
        announcements: [
            'Tithing declaration starts next week',
            'Youth activity on Wednesday at 7:00 PM',
            'Ward temple night: September 29'
        ]
    },
    {
        id: 3,
        date: '2026-09-27',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 5, title: 'High on the Mountain Top' },
        openingPrayer: 'Brother Miller',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
        speakers: [
            { name: 'Sister Adams', topic: 'Finding Peace in Christ', type: 'speaker' },
            { name: 'Primary Children', topic: 'I Know That My Redeemer Lives', type: 'musical-number' },
            { name: 'Brother Adams', topic: 'Living by Revelation', type: 'speaker' }
        ],
        closingHymn: { number: 85, title: 'How Firm a Foundation' },
        closingPrayer: 'Sister Lee',
        announcements: [
            'General Conference is next weekend!',
            'Ward choir practice moved to Thursday evening',
            'Ward temple night: September 29'
        ]
    },
    {
        id: 4,
        date: '2026-10-04',
        meetingType: 'general',
        presiding: 'President Oaks',
        conducting: 'Elder Gong',
        openingHymn: { number: 220, title: 'Lord, I Would Follow Thee' },
        openingPrayer: 'Elder Soares',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 0, title: 'No Sacrament Service (General Conference)' },
        speakers: [
            { name: 'General Authorities', topic: 'Conference Addresses', type: 'speaker' }
        ],
        closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
        closingPrayer: 'Sister Johnson',
        announcements: [
            'No local ward meetings today — watch General Conference online or at the chapel'
        ]
    },
    {
        id: 5,
        date: '2026-10-11',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 13, title: 'God is Love' },
        openingPrayer: 'Sister White',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 184, title: 'Upon the Cross of Calvary' },
        speakers: [
            { name: 'Testimonies from the congregation', topic: '', type: 'speaker' }
        ],
        closingHymn: { number: 216, title: 'We Are Sowing' },
        closingPrayer: 'Brother Wilson',
        announcements: [
            'Stake Conference coming up at the end of the month',
            'Blood drive in the cultural hall this Friday'
        ]
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}