// /app/meetings/layout.tsx
import React from 'react';

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            {/* Section Sub-header */}
            <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Ward Agendas & Programs</h2>
                    <p className="text-xs text-slate-500">View and print upcoming and past sacrament meeting details</p>
                </div>
            </div>

            {/* Render route content (page.tsx, loading.tsx, etc.) */}
            {children}
        </div>
    );
}