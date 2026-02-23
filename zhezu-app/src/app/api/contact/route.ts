import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// TODO: Implement rate limiting (e.g. using upstash/ratelimit or a simple
// in-memory sliding window) to prevent abuse of the contact endpoint.

const SUBJECTS = ['general', 'admission', 'academic', 'technical', 'other'] as const;

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{7,}$/.test(val),
      'Please enter a valid phone number',
    ),
  subject: z.enum(SUBJECTS, { message: 'Please select a subject' }),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Log the validated submission (replace with email/DB logic later)
    console.log('[Contact Form Submission]', {
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone ?? null,
      subject: result.data.subject,
      message: result.data.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: { _form: ['Invalid request body'] } },
      { status: 400 },
    );
  }
}
