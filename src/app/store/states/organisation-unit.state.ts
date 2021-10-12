import { OrganisationUnit } from "src/app/core/models/organisation-unit";
import { BaseState, initialBaseState } from "./base.state";

export interface OrganisationUnitState extends BaseState {
  searchKey: string;
  organisationUnits: Array<OrganisationUnit>;
}

export const initialOrganisationUnitState: OrganisationUnitState = {
  ...initialBaseState,
  searchKey: "",
  organisationUnits: [],
};
