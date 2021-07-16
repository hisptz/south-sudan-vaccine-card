export interface VaccinationCard {
  programId: string;
  programStageId: string;
  headers: Array<VaccinationCardHeader>;
}

interface VaccinationCardHeader {
  id: string;
  label: string;
  isDataElement: boolean;
  isBoolean: boolean;
  isDate: boolean;
}
