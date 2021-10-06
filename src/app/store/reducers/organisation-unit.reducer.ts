import { createReducer, on } from "@ngrx/store";
import * as _ from "lodash";

import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState,
} from "../states/base.state";
import {
  initialOrganisationUnitState,
  OrganisationUnitState,
} from "../states/organisation-unit.state";
import {
  AddOrganisationUnitData,
  LoadOrganisationUnit,
  LoadOrganisationUnitFail,
} from "../actions";

export const reducer = createReducer(
  initialOrganisationUnitState,
  on(LoadOrganisationUnit, (state) => ({
    ...state,
    ...initialOrganisationUnitState,
    ...loadingBaseState,
  })),
  on(AddOrganisationUnitData, (state, { OrganisationUnits }) => ({
    ...state,
    ...loadedBaseState,
    OrganisationUnits,
  })),
  on(LoadOrganisationUnitFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error,
  }))
);

export function organisationUnitReducer(
  state: any,
  action: any
): OrganisationUnitState {
  return reducer(state, action);
}
