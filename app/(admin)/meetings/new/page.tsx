// app/(admin)/meetings/new/page.tsx
import CreateMeetingForm from '../../../components/CreateMeetingForm';

export default function NewMeetingPage() {
    return (
        <div className="space-y-12 py-4">
            {/* Hero Section */}
            <section className="max-w-2xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">
                    Create New Meeting
                </h1>
                <CreateMeetingForm />
            </section>
        </div>
    );
}