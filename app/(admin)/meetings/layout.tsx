// /app/(admin)/meetings/layout.tsx
import React from 'react';
import { auth } from '@/auth';
import { signOut } from '@/auth';

export default async function MeetingsAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="space-y-6">
            {/* Section Sub-header */}
            <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Ward Agendas & Programs</h2>
                    <p className="text-xs text-slate-500">View and print upcoming and past sacrament meeting details</p>
                </div>
                {session?.user && (
                    <form action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/meetings' });
                    }}>
                        <button
                            type="submit"
                            className="text-sm px-3 py-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200"
                        >
                            Sign out
                        </button>
                    </form>
                )}
            </div>
            {children}
        </div>
    );
}