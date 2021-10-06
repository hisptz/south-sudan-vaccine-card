export interface OrganisationUnit {
  id: string;
  name: string;
  level: number;
  ancestors?: Array<{ name: string; level: number }>;
}
