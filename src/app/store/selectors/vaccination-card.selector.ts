import { createSelector } from "@ngrx/store";
import { getRootState, State } from "../reducers";
import { VaccinationCardState } from "../states/vaccination-card.state";
import * as _ from "lodash";

export const getVaccinationCardDataState = createSelector(
  getRootState,
  (state: State) => state.vaccinationCard
);

export const getVaccinationCardList = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.vaccinationCardData
);

export const getTotalVaccinationCardData = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.vaccinationCardData.length || 0
);

export const getSelectedVaccinationCard = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.selectedVaccinationCard
);

export const getCurrentBufferProgress = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.bufferProgress
);

export const getCurrentOverAllProgress = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.overAllProgress
);

export const getVaccinationCardDataLoadingStatus = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.loading
);

export const getVaccinationCardDataError = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.error
);
