import { createSelector } from "@ngrx/store";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
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

export const getSelectedVaccinationCard = createSelector(
  getVaccinationCardDataState,
  (state: VaccinationCardState) => state.selectedVaccinationCardId
);
export const getSelectedGeneratedReport = () =>
  createSelector(
    getVaccinationCardList,
    getSelectedVaccinationCard,
    (
      vaccinationCardList: Array<VaccinationCard>,
      selectedVaccinationCardId: string
    ) => {
      const selectedVaccinationCard = _.find(
        vaccinationCardList,
        (vaccinationCard: VaccinationCard) =>
          vaccinationCard.tei === selectedVaccinationCardId
      );
      return selectedVaccinationCard ?? null;
    }
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
