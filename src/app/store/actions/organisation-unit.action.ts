import { createAction, props } from "@ngrx/store";
import { ErrorMessage } from "@iapps/ngx-dhis2-http-client";
import { OrganisationUnit } from "src/app/core/models/organisation-unit";

export enum OrganisationUnitActionTypes {
  LoadOrganisationUnit = "[Organisation Unit] Load organisation Data",
  AddOrganisationUnitData = "[Organisation Unit] Add organisation unit data",
  LoadOrganisationUnitFail = "[Organisation Unit] load organisation unit data fail",
  SearchOrganisationUnit = "[Organisation Unit] On searching organisation unit"
}

export const LoadOrganisationUnit = createAction(
  OrganisationUnitActionTypes.LoadOrganisationUnit
);

export const AddOrganisationUnitData = createAction(
  OrganisationUnitActionTypes.AddOrganisationUnitData,
  props<{ organisationUnits: Array<OrganisationUnit> }>()
);

export const SearchOrganisationUnit = createAction(
  OrganisationUnitActionTypes.SearchOrganisationUnit,
  props<{ searchText:string  }>()
);


export const LoadOrganisationUnitFail = createAction(
  OrganisationUnitActionTypes.LoadOrganisationUnitFail,
  props<{ error: ErrorMessage }>()
);
