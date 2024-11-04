export interface ClientInfo {
  id: number;
  name: string;
  fullName: string;
  dob: string;
  school: string;
  grade: string;
  teacherName: string;
  targetedBehaviors: string[];
  interventions: string[];
  clinician: {
    name: string;
    email: string;
    phone: string;
  };
}