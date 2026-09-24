'use client';

import { deleteMeetingAction } from '@/lib/actions';

export default function DeleteMeetingButton({ id }: { id: number }) {
    return (
        <form action={deleteMeetingAction.bind(null, id)}>
            <button
                type="submit"
                className="text-sm font-medium text-red-500 hover:text-red-700 hover:underline"
                onClick={(e) => {
                    if (!confirm('Delete this meeting?')) e.preventDefault();
                }}
            >
                Delete
            </button>
        </form>
    );
}