import { createAction, props } from "@ngrx/store";
import { ErrorMessage } from "@iapps/ngx-dhis2-http-client";
import { OrganisationUnit } from "src/app/core/models/organisation-unit";

export enum OrganisationUnitActionTypes {
  LoadOrganisationUnit = "[Organisation Unit] Load organisation Data",
  AddOrganisationUnitData = "[Organisation Unit] Add organisation unit data",
  LoadOrganisationUnitFail = "[Vaccination Card] load organisation unit data fail",
}

export const LoadOrganisationUnit = createAction(
  OrganisationUnitActionTypes.LoadOrganisationUnit
);

export const AddOrganisationUnitData = createAction(
  OrganisationUnitActionTypes.AddOrganisationUnitData,
  props<{ OrganisationUnits: Array<OrganisationUnit> }>()
);

export const LoadOrganisationUnitFail = createAction(
  OrganisationUnitActionTypes.LoadOrganisationUnitFail,
  props<{ error: ErrorMessage }>()
);
