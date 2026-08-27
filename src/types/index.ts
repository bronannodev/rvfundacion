export type CircuitModality = 'circuito_largo' | 'circuito_corto';

export type RegistrationStatus = 'CONFIRMADO' | 'PENDIENTE' | 'CANCELADO';

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  dni: string;
  birthDate: string;
  phone: string;
  email: string;
  locality: string;
  modality: CircuitModality;
  emergencyContactName: string;
  emergencyContactPhone: string;
  trailExperience: 'beginner' | 'intermediate' | 'advanced' | 'none' | '';
  weeklyKilometers: string;
  referralSource: string;
  declaredAccurate: boolean;
  acceptedRules: boolean;
  acceptedTerms: boolean;
  acceptedDonation: boolean;
  declaredFitness: boolean;
}

export interface Participant {
  id: string;
  registrationCode: string;
  firstName: string;
  lastName: string;
  dni: string;
  birthDate: string;
  phone: string;
  email: string;
  locality: string;
  modality: CircuitModality;
  emergencyContactName: string;
  emergencyContactPhone: string;
  trailExperience: string;
  weeklyKilometers: string;
  referralSource: string;
  status: RegistrationStatus;
  createdAt: string;
}

export interface RegistrationSubmissionResult {
  success: boolean;
  registrationId?: string;
  participant?: Participant;
  error?: string;
  timestamp?: string;
}

export interface VerificationResult {
  found: boolean;
  participant?: Participant;
  error?: string;
}

export interface LapDetail {
  lapNumber: number;
  timeString: string;
  startTimeString: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
