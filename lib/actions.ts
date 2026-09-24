// lib/actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting } from './meetings-db';

// This describes what errors/messages the form gets back
export type State = {
    errors?: {
        date?: string[];
        meetingType?: string[];
        presiding?: string[];
        conducting?: string[];
        openingPrayer?: string[];
        closingPrayer?: string[];
        openingHymnNumber?: string[];
        openingHymnTitle?: string[];
        sacramentHymnNumber?: string[]; 
        sacramentHymnTitle?: string[];
        closingHymnNumber?: string[];
        closingHymnTitle?: string[];
        stakeBusiness?: string[];
    };
    message?: string | null;
};

// Zod schema - validates the simple text fields from the form
const MeetingFormSchema = z.object({
    date: z.string().min(1, 'Date is required.'),
    meetingType: z.enum(
        ['testimony', 'regular', 'stake', 'general'],
        { message: 'Please select a valid meeting type.' }
    ),
    presiding: z.string().min(2, 'Presiding name must be at least 2 characters.'),
    conducting: z.string().min(2, 'Conducting name must be at least 2 characters.'),
    openingPrayer: z.string().min(2, 'Opening prayer name is required.'),
    closingPrayer: z.string().min(2, 'Closing prayer name is required.'),
    // Hymns
    openingHymnNumber: z.coerce.number().int().min(1, 'Hymn number is required.'),
    openingHymnTitle: z.string().min(1, 'Hymn title is required.'),
    sacramentHymnNumber: z.coerce.number().int().min(1, 'Hymn number is required.'),
    sacramentHymnTitle: z.string().min(1, 'Hymn title is required.'),
    closingHymnNumber: z.coerce.number().int().min(1, 'Hymn number is required.'),
    closingHymnTitle: z.string().min(1, 'Hymn title is required.'),
    // Stake business
    stakeBusiness: z.coerce.boolean().default(false),
    // Speakers - fixed 4 slots, blank ones get filtered out
    speaker0Name: z.string().optional(),
    speaker0Topic: z.string().optional(),
    speaker0Type: z.enum(['speaker', 'musical-number']).default('speaker'),
    speaker1Name: z.string().optional(),
    speaker1Topic: z.string().optional(),
    speaker1Type: z.enum(['speaker', 'musical-number']).default('speaker'),
    speaker2Name: z.string().optional(),
    speaker2Topic: z.string().optional(),
    speaker2Type: z.enum(['speaker', 'musical-number']).default('speaker'),
    speaker3Name: z.string().optional(),
    speaker3Topic: z.string().optional(),
    speaker3Type: z.enum(['speaker', 'musical-number']).default('speaker'),
});

export async function createMeeting(
    prevState: State,
    formData: FormData
): Promise<State> {
    // Validate the form fields
    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        openingPrayer: formData.get('openingPrayer'),
        closingPrayer: formData.get('closingPrayer'),
        openingHymnNumber: formData.get('openingHymnNumber'),
        openingHymnTitle: formData.get('openingHymnTitle'),
        sacramentHymnNumber: formData.get('sacramentHymnNumber'),
        sacramentHymnTitle: formData.get('sacramentHymnTitle'),
        closingHymnNumber: formData.get('closingHymnNumber'),
        closingHymnTitle: formData.get('closingHymnTitle'),
        stakeBusiness: formData.get('stakeBusiness'),
        speaker0Name: formData.get('speaker0Name'),
        speaker0Topic: formData.get('speaker0Topic'),
        speaker0Type: formData.get('speaker0Type'),
        speaker1Name: formData.get('speaker1Name'),
        speaker1Topic: formData.get('speaker1Topic'),
        speaker1Type: formData.get('speaker1Type'),
        speaker2Name: formData.get('speaker2Name'),
        speaker2Topic: formData.get('speaker2Topic'),
        speaker2Type: formData.get('speaker2Type'),
        speaker3Name: formData.get('speaker3Name'),
        speaker3Topic: formData.get('speaker3Topic'),
        speaker3Type: formData.get('speaker3Type'),
    });

    // If validation fails, return errors to the form
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create meeting.',
        };
    }

    // Build speakers array from fixed slots, filtering out empty ones
    const speakers = [0, 1, 2, 3]
        .map(i => ({
            name: validatedFields.data[`speaker${i}Name` as keyof typeof validatedFields.data] as string ?? '',
            topic: validatedFields.data[`speaker${i}Topic` as keyof typeof validatedFields.data] as string ?? '',
            type: validatedFields.data[`speaker${i}Type` as keyof typeof validatedFields.data] as 'speaker' | 'musical-number',
        }))
        .filter(s => s.name.trim() !== '');

    // If valid, write to the database
    try {
        await addMeeting({
            ...validatedFields.data,
            announcements: [],
            openingHymn: {
                number: validatedFields.data.openingHymnNumber,
                title: validatedFields.data.openingHymnTitle,
            },
            wardBusiness: [],
            stakeBusiness: validatedFields.data.stakeBusiness,
            sacramentHymn: {
                number: validatedFields.data.sacramentHymnNumber,
                title: validatedFields.data.sacramentHymnTitle
            },
            speakers: speakers,
            closingHymn: {
                number: validatedFields.data.closingHymnNumber,
                title: validatedFields.data.closingHymnTitle,
            },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to create meeting.' };
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeetingAction(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        openingPrayer: formData.get('openingPrayer'),
        closingPrayer: formData.get('closingPrayer'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to update meeting.',
        };
    }

    try {
        await updateMeeting(id, validatedFields.data);
    } catch (error) {
        return { message: 'Database Error: Failed to update meeting.' };
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function deleteMeetingAction(id: number): Promise<void> {
    try {
        await deleteMeeting(id);
        revalidatePath('/meetings');
    } catch (error) {
        throw new Error('Failed to delete meeting.');
    }
}