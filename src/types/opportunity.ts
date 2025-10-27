export interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits?: string[];
  postedDate: string;
}

export interface CVSubmission {
  id: string;
  opportunityId: string;
  name: string;
  email: string;
  phone: string;
  coverLetter?: string;
  cvFile: File;
  submittedDate: string;
}
