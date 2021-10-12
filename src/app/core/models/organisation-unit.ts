export interface OrganisationUnit {
  id: string;
  name: string;
  displayName: string;
  level: number;
  ancestors?: Array<{ name: string; level: number }>;
}
