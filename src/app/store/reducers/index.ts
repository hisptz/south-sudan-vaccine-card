import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "../../../environments/environment";
import { OrganisationUnitState } from "../states/organisation-unit.state";
import { SystemInfoState } from "../states/system-info.state";
import { UserState } from "../states/user.state";
import { VaccinationCardState } from "../states/vaccination-card.state";
import { organisationUnitReducer } from "./organisation-unit.reducer";
import { systemInfoReducer } from "./system-info.reducer";
import { userReducer } from "./user.reducer";
import { vaccinationCardDataReducer } from "./vaccination-card.reducer";

export interface State {
  user: UserState;
  systemInfo: SystemInfoState;
  router: RouterReducerState;
  vaccinationCard: VaccinationCardState;
  orgninisationUnit: OrganisationUnitState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  systemInfo: systemInfoReducer,
  router: routerReducer,
  vaccinationCard: vaccinationCardDataReducer,
  orgninisationUnit: organisationUnitReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

/**
 * Root state selector
 */
export const getRootState = (state: State) => state;
