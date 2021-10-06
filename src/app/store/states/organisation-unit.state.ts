import { OrganisationUnit } from "src/app/core/models/organisation-unit";
import { BaseState, initialBaseState } from "./base.state";

export interface OrganisationUnitState extends BaseState {
  OrganisationUnits: Array<OrganisationUnit>;
}

export const initialOrganisationUnitState: OrganisationUnitState = {
  ...initialBaseState,
  OrganisationUnits: [],
};
