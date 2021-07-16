import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { BaseState, initialBaseState } from "./base.state";

export interface VaccinationCardState extends BaseState {
  vaccinationCardData: Array<VaccinationCard>;
  selectedVaccinationCardId: string;
  bufferProgress: number;
  overAllProgress: number;
}

export const initialVaccinationCardState: VaccinationCardState = {
  ...initialBaseState,
  selectedVaccinationCardId: "",
  bufferProgress: 0,
  overAllProgress: 0,
  vaccinationCardData: [],
};
