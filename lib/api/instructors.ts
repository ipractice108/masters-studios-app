import { Instructor } from '@/lib/types';

export async function createInstructor(data: Omit<Instructor, 'id' | 'createdAt' | 'updatedAt'>) {
  const response = await fetch('/api/instructors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create instructor');
  }

  return result.data;
}

export async function getInstructors() {
  const response = await fetch('/api/instructors');
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to fetch instructors');
  }

  return result.data;
}
