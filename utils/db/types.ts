export interface Subject {
  id: number;
  name: string;
}

export interface Institution {
  id: number;
  qsScore: number;
  timesScore: number;
  name: string;
  lowerCaseName: string;
  countryCode: string;
  website: string;
}

export interface SubjectOffered {
  id: number;
  institutionId: number;
  subjectId: number;
}
