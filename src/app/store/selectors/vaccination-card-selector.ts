import { createSelector } from "@ngrx/store";
import {
  VaccinationCard,
  VaccinationCardHeader,
} from "src/app/core/models/vaccination-card";
import { getRootState, State } from "../reducers";
import { VaccinationCardState } from "../states/vaccination-card-state";
import * as _ from "lodash";

export const getVaccinationCardDataState = createSelector(
  getRootState,
  (state: State) => state.vaccinationCard
);

export const getVaccinationCardList = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.vaccinationCardData
);

export const getSelectedVaccinationCardDosesIndex = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => {
    const selectedVaccinationCard: VaccinationCard =
      state.selectedVaccinationCard;
    return _.uniq(
      _.flattenDeep(
        _.map(
          _.filter(
            selectedVaccinationCard.headers || [],
            (headerConfig: VaccinationCardHeader) =>
              headerConfig.hasOwnProperty("doseIndex")
          ),
          (headerConfig: VaccinationCardHeader) => headerConfig.doseIndex
        )
      )
    );
  }
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
