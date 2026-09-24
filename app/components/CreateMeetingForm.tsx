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
            {/* Opening Hymn */}
            <fieldset className="border border-slate-200 rounded-md p-4">
                <legend className="text-sm font-medium text-slate-700 px-1">Opening Hymn</legend>
                <div className="grid grid-cols-3 gap-3 mt-2">
                    <div>
                        <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-slate-700 mb-1">
                            Number
                        </label>
                        <input
                            id="openingHymnNumber"
                            name="openingHymnNumber"
                            type="number"
                            min="1"
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-describedby="openingHymnNumber-error"
                        />
                        <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.openingHymnNumber?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-slate-700 mb-1">
                            Title
                        </label>
                        <input
                            id="openingHymnTitle"
                            name="openingHymnTitle"
                            type="text"
                            placeholder="Hymn title"
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-describedby="openingHymnTitle-error"
                        />
                        <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.openingHymnTitle?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Sacrament Hymn */}
            <fieldset className="border border-slate-200 rounded-md p-4">
                <legend className="text-sm font-medium text-slate-700 px-1">Sacrament Hymn</legend>
                <div className="grid grid-cols-3 gap-3 mt-2">
                    <div>
                        <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-slate-700 mb-1">
                            Number
                        </label>
                        <input
                            id="sacramentHymnNumber"
                            name="sacramentHymnNumber"
                            type="number"
                            min="1"
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-describedby="sacramentHymnNumber-error"
                        />
                        <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.sacramentHymnNumber?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-slate-700 mb-1">
                            Title
                        </label>
                        <input
                            id="sacramentHymnTitle"
                            name="sacramentHymnTitle"
                            type="text"
                            placeholder="Hymn title"
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-describedby="sacramentHymnTitle-error"
                        />
                        <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.sacramentHymnTitle?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Closing Hymn */}
            <fieldset className="border border-slate-200 rounded-md p-4">
                <legend className="text-sm font-medium text-slate-700 px-1">Closing Hymn</legend>
                <div className="grid grid-cols-3 gap-3 mt-2">
                    <div>
                        <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-slate-700 mb-1">
                            Number
                        </label>
                        <input
                            id="closingHymnNumber"
                            name="closingHymnNumber"
                            type="number"
                            min="1"
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-describedby="closingHymnNumber-error"
                        />
                        <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.closingHymnNumber?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-slate-700 mb-1">
                            Title
                        </label>
                        <input
                            id="closingHymnTitle"
                            name="closingHymnTitle"
                            type="text"
                            placeholder="Hymn title"
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-describedby="closingHymnTitle-error"
                        />
                        <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.closingHymnTitle?.map((error) => (
                                <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Speakers & Musical Numbers */}
            <fieldset className="border border-slate-200 rounded-md p-4">
                <legend className="text-sm font-medium text-slate-700 px-1">
                    Speakers & Musical Numbers (leave blank to skip)
                </legend>
                <div className="space-y-4 mt-2">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="grid grid-cols-12 gap-2 items-start">
                            <div className="col-span-4">
                                <label
                                    htmlFor={`speaker${i}Name`}
                                    className="block text-xs font-medium text-slate-600 mb-1"
                                >
                                    {i === 2 ? 'Musical Number' : `Speaker ${i + 1}`} Name
                                </label>
                                <input
                                    id={`speaker${i}Name`}
                                    name={`speaker${i}Name`}
                                    type="text"
                                    placeholder="Name"
                                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-span-5">
                                <label
                                    htmlFor={`speaker${i}Topic`}
                                    className="block text-xs font-medium text-slate-600 mb-1"
                                >
                                    Topic / Piece
                                </label>
                                <input
                                    id={`speaker${i}Topic`}
                                    name={`speaker${i}Topic`}
                                    type="text"
                                    placeholder="Topic or musical piece"
                                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-span-3">
                                <label
                                    htmlFor={`speaker${i}Type`}
                                    className="block text-xs font-medium text-slate-600 mb-1"
                                >
                                    Type
                                </label>
                                <select
                                    id={`speaker${i}Type`}
                                    name={`speaker${i}Type`}
                                    defaultValue={i === 2 ? 'musical-number' : 'speaker'}
                                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="speaker">Speaker</option>
                                    <option value="musical-number">Musical Number</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>

            {/* Stake Business */}
            <div className="flex items-center gap-3">
                <input
                    id="stakeBusiness"
                    name="stakeBusiness"
                    type="checkbox"
                    value="true"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="stakeBusiness" className="text-sm font-medium text-slate-700">
                    Stake Business
                </label>
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