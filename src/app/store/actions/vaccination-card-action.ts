import { createAction, props } from "@ngrx/store";
import { ErrorMessage } from "@iapps/ngx-dhis2-http-client";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

export enum VaccinationCardActionTypes {
  LoadVaccinationCardData = "[Vaccination Card] Load Vaccination Card Data",
  AddVaccinationCardData = "[Vaccination Card] Add Vaccination Card Data",
  ClearVaccinationCardData = "[Vaccination Card] Clear Vaccination Card Data",
  UpdateVaccinationCardDataProgress = "[Vaccination Card] Update Vaccination Card Data progress",
  SetSelectedVaccinationCard = "[Vaccination Card] Set selected Vaccination Card Data",
  LoadVaccinationCardDataFail = "[Vaccination Card] Load Vaccination Card Data fail",
}

export const LoadVaccinationCardData = createAction(
  VaccinationCardActionTypes.LoadVaccinationCardData,
  props<{
    vaccinationCardConfigs: any;
    selectedPeriods: any;
    selectedOrgUnits: any;
  }>()
);

export const AddVaccinationCardData = createAction(
  VaccinationCardActionTypes.AddVaccinationCardData,
  props<{ vaccinationCardData: Array<VaccinationCard> }>()
);

export const UpdateVaccinationCardDataProgress = createAction(
  VaccinationCardActionTypes.UpdateVaccinationCardDataProgress,
  props<{ overAllProgress: number; bufferProgress: number }>()
);

export const SetSelectedVaccinationCard = createAction(
  VaccinationCardActionTypes.SetSelectedVaccinationCard,
  props<{ selectedVaccinationCardId: string }>()
);

export const ClearVaccinationCardData = createAction(
  VaccinationCardActionTypes.ClearVaccinationCardData
);

export const LoadVaccinationCardDataFail = createAction(
  VaccinationCardActionTypes.LoadVaccinationCardDataFail,
  props<{ error: ErrorMessage }>()
);
