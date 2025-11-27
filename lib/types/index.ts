export interface Instructor {
  id?: string;
  disciplines: string[];
  customDiscipline?: string;
  stations: string[];
  price: number;
  groupTraining: boolean;
  individualTraining: boolean;
  employmentStatus: 'selfEmployed' | 'individual' | '';
  experience: string;
  photoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Studio {
  id?: string;
  name: string;
  description: string;
  address: string;
  stations: string[];
  contactEmail: string;
  contactPhone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobRequest {
  id?: string;
  studioId: string;
  discipline: string;
  date: string;
  time: string;
  station: string;
  trainingType: 'group' | 'individual';
  payment: number;
  description: string;
  status: 'open' | 'closed' | 'filled';
  createdAt?: string;
  updatedAt?: string;
}

export interface Application {
  id?: string;
  instructorId: string;
  jobRequestId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

export type FormState = 'idle' | 'loading' | 'success' | 'error';
