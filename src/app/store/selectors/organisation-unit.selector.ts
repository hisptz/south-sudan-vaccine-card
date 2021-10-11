import { createSelector } from "@ngrx/store";
import { getRootState, State } from "../reducers";
import * as _ from "lodash";
import { OrganisationUnitState } from "../states/organisation-unit.state";
import { OrganisationUnit } from "src/app/core/models/organisation-unit";

export const getOrganisationUnitState = createSelector(
  getRootState,
  (state: State) => state.orgninisationUnit
);

export const getOrganisationUnitList =
  createSelector(getOrganisationUnitState, (state: OrganisationUnitState) => {
    const searchedText = state.searchKey.trim();
    const organisationUnits = searchedText !== ""
    ? _.filter(
        state.organisationUnits || [],
        (organisationUnit: OrganisationUnit) =>
          organisationUnit &&
          organisationUnit.name &&
          `${organisationUnit.name}`.includes(searchedText)
      )
    : [];
    return organisationUnits;
  });

export const getOrganisationUnitLoadingStatus = createSelector(
  getOrganisationUnitState,
  (state: OrganisationUnitState) => state.loading
);

export const getOrganisationUnitError = createSelector(
  getOrganisationUnitState,
  (state: OrganisationUnitState) => state.error
);
