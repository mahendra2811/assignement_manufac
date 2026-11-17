import type { Assessment } from './schema';

type EditableFields =
  | 'dateOfBirth'
  | 'assessmentDate'
  | 'followUpDate'
  | 'mobility'
  | 'barthelIndex'
  | 'medicationCount'
  | 'consentObtained';

export type AssessmentInput = Omit<Assessment, EditableFields> & {
  dateOfBirth: string | null;
  assessmentDate: string | null;
  followUpDate: string | null;
  mobility: string | null;
  barthelIndex: number | string;
  medicationCount: number | string;
  consentObtained: boolean;
};

export const initialValues: AssessmentInput = {
  mrn: '',
  patientName: '',
  dateOfBirth: null,
  assessmentDate: null,
  mobility: null,
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: null,
  consentObtained: false,
};

export const samplePatient: Assessment = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1949-03-12',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};
