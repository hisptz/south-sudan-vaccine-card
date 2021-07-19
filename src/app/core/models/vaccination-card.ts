export interface VaccinationCard {
  tei: string;
  headers: Array<VaccinationCardHeader>;
}

export interface VaccinationCardHeader {
  id: string;
  name: string;
  displayName: String;
  isDataElement: boolean;
  isBoolean: boolean;
  isDate: boolean;
  isVisibleOnList: boolean;
  isBioInfoCard: boolean;
  organisationUnitLevel?: number;
  doseIndex?: number;
  value?: string;
}
