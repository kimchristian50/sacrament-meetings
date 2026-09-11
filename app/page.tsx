// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="space-y-12 py-4">
            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
                <Image src='/christus-statue.webp' alt='The Christus by Thorvaldsen' width={1000} height={580}  className="w-full h-fit object-cover rounded mb-3" />
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Sacrament Meeting Planner
                </h1>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <Link
                        href="/meetings/current"
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition text-center"
                    >
                        View the Program for This Sunday
                    </Link>
                    <Link
                        href="/meetings"
                        className="w-full sm:w-auto px-6 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition text-center"
                    >
                        Browse All Meetings
                    </Link>
                </div>
            </section>
        </div>
    );
}