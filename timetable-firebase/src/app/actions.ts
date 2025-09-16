'use server';

import { z } from 'zod';
import { generateOptimizedTimetables, type GenerateOptimizedTimetablesOutput } from '@/ai/flows/generate-optimized-timetables';
import { chat, type ChatOutput } from '@/ai/flows/assistant-flow';

const TimetableFormSchema = z.object({
  departmentId: z.string().min(1, 'Department is required.'),
  semesterId: z.string().min(1, 'Semester is required.'),
  subjectIds: z.array(z.string()).min(1, 'At least one subject is required.'),
});

export type TimetableState = {
  message?: string | null;
  errors?: {
    departmentId?: string[];
    semesterId?: string[];
    subjectIds?: string[];
    server?: string[];
  };
  result?: GenerateOptimizedTimetablesOutput;
};

export async function createTimetable(prevState: TimetableState, formData: FormData): Promise<TimetableState> {
  const subjectIdsString = formData.get('selectedSubjects') as string;
  let subjectIds: string[] = [];
  
  try {
    subjectIds = subjectIdsString ? JSON.parse(subjectIdsString) : [];
  } catch (error) {
    console.error('Error parsing selectedSubjects:', error);
    subjectIds = [];
  }

  // If no subjects selected, use default subjects for the department/semester
  const departmentId = formData.get('departmentId') as string;
  const semesterId = formData.get('semesterId') as string;
  
  if (subjectIds.length === 0 && departmentId && semesterId) {
    // Import the function to get default subjects
    const { getSubjectsForDepartmentAndSemester } = await import('@/lib/data');
    const defaultSubjects = getSubjectsForDepartmentAndSemester(departmentId, semesterId);
    subjectIds = defaultSubjects.map(s => s.id);
  }

  const validatedFields = TimetableFormSchema.safeParse({
    departmentId,
    semesterId,
    subjectIds: subjectIds,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to generate timetable.',
    };
  }
  
  const { departmentId: validDeptId, semesterId: validSemId, subjectIds: validatedSubjectIds } = validatedFields.data;

  // Check if subjectIds is still empty after all attempts
  if (validatedSubjectIds.length === 0) {
    return {
      message: 'No subjects available for the selected department and semester',
      errors: { subjectIds: ['No subjects found for this combination'] }
    };
  }

  try {
    // This is where you'd fetch real constraints from Firestore
    const mockConstraints = {
        classrooms: ['CR101', 'CR102', 'CR201'],
        facultyLoad: { 'F001': 10, 'F002': 12, 'F003': 8 },
        subjectWeeklyHours: { 'S01': 4, 'S02': 3, 'S03': 4, 'S04': 3 },
        leaves: { 'F002': ['2024-10-22'] },
        fixedSlots: [],
    };

    const result = await generateOptimizedTimetables({
      departmentId: validDeptId,
      semesterId: validSemId,
      subjectIds: validatedSubjectIds,
      constraints: mockConstraints,
    });

    if (result && result.length > 0) {
      return { message: 'Successfully generated timetables.', result: result };
    } else {
      return { message: 'AI failed to generate timetables.', errors: { server: ['No results returned.'] } };
    }
    
  } catch (error) {
    console.error('Error generating timetable:', error);
    return { message: 'Database Error: Failed to generate timetable.', errors: { server: ['An unexpected error occurred.'] } };
  }
}


const AssistantFormSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required.'),
});

export type AssistantState = {
  message?: string | null;
  errors?: {
    prompt?: string[];
    server?: string[];
  };
  result?: ChatOutput;
};


export async function askAssistant(prevState: AssistantState, formData: FormData): Promise<AssistantState> {
  const validatedFields = AssistantFormSchema.safeParse({
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to get response.',
    };
  }
  
  const { prompt } = validatedFields.data;

  try {
    const result = await chat({
      prompt,
    });

    if (result) {
      return { message: 'Successfully received response.', result: result };
    } else {
      return { message: 'AI failed to generate a response.', errors: { server: ['No results returned.'] } };
    }
    
  } catch (error) {
    console.error('Error getting response from assistant:', error);
    return { message: 'Server Error: Failed to get response.', errors: { server: ['An unexpected error occurred.'] } };
  }
}

const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export type LoginState = {
  message?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    server?: string[];
  };
  success?: boolean;
};

// Mock login action
export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Simple validation - just check if fields are not empty
    if (!email || email.trim() === '') {
        return {
            errors: { email: ['Email is required.'] },
            message: 'Email is required.',
        };
    }
    
    if (!password || password.trim() === '') {
        return {
            errors: { password: ['Password is required.'] },
            message: 'Password is required.',
        };
    }
    
    // Mock authentication - accept any non-empty email and password
    return { success: true, message: "Login successful!" };
}
