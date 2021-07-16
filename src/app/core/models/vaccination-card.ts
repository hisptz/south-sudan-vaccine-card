export interface VaccinationCard {
  tei: string;
  headers: Array<VaccinationCardHeader>;
}

interface VaccinationCardHeader {
  id: string;
  label: string;
  isDataElement: boolean;
  isBoolean: boolean;
  isDate: boolean;
  value: string;
}
