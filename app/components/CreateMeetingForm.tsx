'use client';

import { useActionState } from 'react';
import { createMeeting, type State } from '@/lib/actions';

const initialState: State = { message: null, errors: {} };

export default function CreateMeetingForm() {
    const [state, formAction, isPending] = useActionState(createMeeting, initialState);

    return (
        <form action={formAction} className="space-y-6 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
{/* Date */}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                    Meeting Date
                </label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-describedby="date-error"
                />
                <div id="date-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.date?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                    ))}
                </div>
            </div>
            {/* Meeting Type */}
            <div>
                <label htmlFor="meetingType" className="block text-sm font-medium text-slate-700 mb-1">
                    Meeting Type
                </label>
                <select
                    id="meetingType"
                    name="meetingType"
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-describedby="meetingType-error"
                >
                    <option value="">Select a type...</option>
                    <option value="testimony">Testimony</option>
                    <option value="regular">Regular</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                </select>
                <div id="meetingType-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.meetingType?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                    ))}
                </div>
            </div>
            {/* Presiding */}
            <div>
                <label htmlFor="presiding" className="block text-sm font-medium text-slate-700 mb-1">
                    Presiding
                </label>
                <input
                    id="presiding"
                    name="presiding"
                    type="text"
                    placeholder="Name of presiding leader"
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-describedby="presiding-error"
                />
                <div id="presiding-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.presiding?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                    ))}
                </div>
            </div>
            {/* Conducting */}
            <div>
                <label htmlFor="conducting" className="block text-sm font-medium text-slate-700 mb-1">
                    Conducting
                </label>
                <input
                    id="conducting"
                    name="conducting"
                    type="text"
                    placeholder="Name of conducting leader"
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-describedby="conducting-error"
                />
                <div id="conducting-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.conducting?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                    ))}
                </div>
            </div>
            {/* Opening Prayer */}
            <div>
                <label htmlFor="openingPrayer" className="block text-sm font-medium text-slate-700 mb-1">
                    Opening Prayer
                </label>
                <input
                    id="openingPrayer"
                    name="openingPrayer"
                    type="text"
                    placeholder="Name of person giving opening prayer"
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-describedby="openingPrayer-error"
                />
                <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.openingPrayer?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                    ))}
                </div>
            </div>
            {/* Closing Prayer */}
            <div>
                <label htmlFor="closingPrayer" className="block text-sm font-medium text-slate-700 mb-1">
                    Closing Prayer
                </label>
                <input
                    id="closingPrayer"
                    name="closingPrayer"
                    type="text"
                    placeholder="Name of person giving closing prayer"
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-describedby="closingPrayer-error"
                />
                <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.closingPrayer?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                    ))}
                </div>
            </div>
            {/* General error message */}
            {state.message && (
                <p className="text-sm text-red-600 font-medium">{state.message}</p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? 'Creating...' : 'Create Meeting'}
            </button>
        </form>
    );
}