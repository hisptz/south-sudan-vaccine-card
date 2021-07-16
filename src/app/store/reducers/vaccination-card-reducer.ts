import { createReducer, on } from "@ngrx/store";
import * as _ from "lodash";

import {
  LoadVaccinationCardData,
  LoadVaccinationCardDataFail,
  SetSelectedVaccinationCard,
  AddVaccinationCardData,
  UpdateVaccinationCardDataProgress,
  ClearVaccinationCardData,
} from "../actions/vaccination-card-action";
import {
  initialVaccinationCardState,
  VaccinationCardState,
} from "../states/vaccination-card-state";
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState,
} from "../states/base.state";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

export const reducer = createReducer(
  initialVaccinationCardState,
  on(LoadVaccinationCardData, (state) => ({
    ...state,
    ...initialVaccinationCardState,
    ...loadingBaseState,
  })),
  on(ClearVaccinationCardData, (state) => ({
    ...state,
    ...initialVaccinationCardState,
  })),
  on(AddVaccinationCardData, (state, { vaccinationCardData }) => ({
    ...state,
    ...loadedBaseState,
    vaccinationCardData,
  })),
  on(SetSelectedVaccinationCard, (state, { selectedVaccinationCardId }) => ({
    ...state,
    ...loadedBaseState,
    selectedVaccinationCard: _.find(
      state.vaccinationCardData,
      (vaccinationCard: VaccinationCard) =>
        vaccinationCard.tei === selectedVaccinationCardId
    ),
  })),
  on(
    UpdateVaccinationCardDataProgress,
    (state, { bufferProgress, overAllProgress }) => ({
      ...state,
      bufferProgress,
      overAllProgress,
    })
  ),
  on(LoadVaccinationCardDataFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error,
  }))
);

export function vaccinationCardDataReducer(
  state: any,
  action: any
): VaccinationCardState {
  return reducer(state, action);
}
