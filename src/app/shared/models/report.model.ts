export interface Report {
  id: string;
  name: string;
  program: string;
  disablePeriodSelection?: boolean;
  disableOrgUnitSelection?: boolean;
  dxConfigs: DxConfig[];
}

interface DxConfig {
  programStage: string;
  name: string;
  id: string;
  isBoolean: boolean;
  isDate: boolean;
  codes?: string[];
  displayValues?: any[];
}
