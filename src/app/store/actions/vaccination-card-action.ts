import { createAction, props } from "@ngrx/store";
import { ErrorMessage } from "@iapps/ngx-dhis2-http-client";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

export enum VaccinationCardActionTypes {
  LoadVaccinationCardData = "[Vaccination Card] Load Vaccination Card Data",
  LoadVaccinationCardDataById = "[Vaccination Card] Load Vaccination Card Data by Id",
  AddVaccinationCardData = "[Vaccination Card] Add Vaccination Card Data",
  AddVaccinationCardDataById = "[Vaccination Card] Add Vaccination Card Data by Id",
  ClearVaccinationCardData = "[Vaccination Card] Clear Vaccination Card Data",
  UpdateVaccinationCardDataProgress = "[Vaccination Card] Update Vaccination Card Data progress",
  SetSelectedVaccinationCard = "[Vaccination Card] Set selected Vaccination Card Data",
  LoadVaccinationCardDataFail = "[Vaccination Card] Load Vaccination Card Data fail",
}

export const LoadVaccinationCardData = createAction(
  VaccinationCardActionTypes.LoadVaccinationCardData,
  props<{
    vaccinationCardConfigs: any;
    selectedOrgUnits: any;
    selectedPeriods: any;
  }>()
);

export const LoadVaccinationCardDataById = createAction(
  VaccinationCardActionTypes.LoadVaccinationCardDataById,
  props<{
    vaccinationCardConfigs: any;
    seletectedTeiId: string;
  }>()
);

export const AddVaccinationCardData = createAction(
  VaccinationCardActionTypes.AddVaccinationCardData,
  props<{ vaccinationCardData: Array<VaccinationCard> }>()
);

export const AddVaccinationCardDataById = createAction(
  VaccinationCardActionTypes.AddVaccinationCardDataById,
  props<{
    vaccinationCardData: VaccinationCard;
    selectedVaccinationCardId: string;
  }>()
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
