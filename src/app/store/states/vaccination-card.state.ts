import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { BaseState, initialBaseState } from "./base.state";

export interface VaccinationCardState extends BaseState {
  vaccinationCardData: Array<VaccinationCard>;
  selectedVaccinationCard: VaccinationCard;
  bufferProgress: number;
  overAllProgress: number;
}

export const initialVaccinationCardState: VaccinationCardState = {
  ...initialBaseState,
  selectedVaccinationCard: null,
  bufferProgress: 0,
  overAllProgress: 0,
  vaccinationCardData: [],
};
