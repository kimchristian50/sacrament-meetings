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
    });

    // If validation fails, return errors to the form
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create meeting.',
        };
    }

    // If valid, write to the database
    try {
        await addMeeting({
            ...validatedFields.data,
            announcements: [],
            openingHymn: { number: 0, title: '' },
            wardBusiness: [],
            stakeBusiness: false,
            sacramentHymn: { number: 0, title: '' },
            speakers: [],
            closingHymn: { number: 0, title: '' },
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