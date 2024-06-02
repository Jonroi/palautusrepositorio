export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// Utility type to exclude specific keys from a type
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Type for Patient data excluding ssn
export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;
