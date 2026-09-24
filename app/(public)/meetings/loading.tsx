export default function MeetingsLoading() {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 animate-pulse">Loading meeting agenda...</p>
        </div>
    );
}