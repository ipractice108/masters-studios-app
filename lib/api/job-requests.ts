import { JobRequest } from '@/lib/types';

export async function createJobRequest(data: Omit<JobRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
  const response = await fetch('/api/job-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create job request');
  }

  return result.data;
}

export async function getJobRequests(status?: string) {
  const url = status ? `/api/job-requests?status=${status}` : '/api/job-requests';
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to fetch job requests');
  }

  return result.data;
}
