import * as _ from "lodash";
import {
  VACCINE_CARD_DOSES_HEADERS,
  VACCINE_CARD_LOCATION,
  VACCINE_CARD_BIO,
  VACCINE_CARD_QR_CODE,
} from "src/app/core/configs/vaccine-dose-headers";
import {
  VaccinationCard,
  VaccinationCardHeader,
} from "src/app/core/models/vaccination-card";

export function getQrCodeBioData(selectedVaccinationCard: VaccinationCard) {
  return _.join(
    _.flattenDeep(
      _.map(VACCINE_CARD_QR_CODE.bioData || [], (bioDataConfig) => {
        const { name, ids } = bioDataConfig;
        const value = _.join(
          _.filter(
            _.flattenDeep(
              _.map(ids, (id: string) => {
                const cardData = _.find(
                  selectedVaccinationCard.headers,
                  (data: VaccinationCardHeader) => data?.id === id
                );
                return cardData && cardData.value ? cardData.value : "";
              })
            ),
            (value: string) => value != ""
          ),
          " "
        );
        return `${name} : ${value}`;
      })
    ),
    "\n"
  );
}

export function getQrCodeDosesData(
  doses: any,
  selectedVaccinationCard: VaccinationCard
) {
  return _.join(
    _.flattenDeep(
      _.map(doses, (doseIndex: any) => {
        const selectedDose: Array<VaccinationCardHeader> = _.filter(
          selectedVaccinationCard.headers || [],
          (headerConfig: VaccinationCardHeader) =>
            headerConfig.hasOwnProperty("doseIndex") &&
            `${headerConfig.doseIndex}` === `${doseIndex}`
        );
        const hasSelectedDoseEmpty =
          _.flattenDeep(
            _.map(selectedDose, (data: any) =>
              data?.value !== "" ? data.value : []
            )
          ).length === 0;
        return hasSelectedDoseEmpty
          ? []
          : _.map(VACCINE_CARD_QR_CODE?.doseData || [], (doseConfig: any) => {
              const { ids, name } = doseConfig;
              const value = _.join(
                _.filter(
                  _.flattenDeep(
                    _.map(ids, (id: string) => {
                      const cardData = _.find(
                        selectedDose,
                        (data: VaccinationCardHeader) => data?.id === id
                      );
                      return cardData && cardData.value ? cardData.value : "";
                    })
                  ),
                  (value: string) => value != ""
                ),
                " "
              );
              return `${name} : ${value}`;
            });
      })
    ),
    ", "
  );
}

export function getVaccineCardBioData(
  selectedVaccinationCard: VaccinationCard
) {
  return _.map(VACCINE_CARD_BIO, (bioDataRow: any) => {
    return _.map(bioDataRow, (bioData: any) => {
      const { name, ids } = bioData;
      const value = _.join(
        _.filter(
          _.flattenDeep(
            _.map(ids, (id: string) => {
              const cardData = _.find(
                selectedVaccinationCard.headers,
                (data: VaccinationCardHeader) => data?.id === id
              );
              return cardData && cardData.value ? cardData.value : "";
            })
          ),
          (value: string) => value != ""
        ),
        " "
      );
      return { name, value };
    });
  });
}

export function getVaccineCardBioLocation(
  selectedVaccinationCard: VaccinationCard
) {
  return _.join(
    _.filter(
      _.flattenDeep(
        _.map(VACCINE_CARD_LOCATION, (id: string) => {
          const cardData = _.find(
            selectedVaccinationCard.headers,
            (data: VaccinationCardHeader) => data?.id === id
          );
          return cardData && cardData.value ? cardData.value : "";
        })
      ),
      (value: string) => value != ""
    ),
    " > "
  );
}

export function getDoseIndexes(selectedVaccinationCard: VaccinationCard) {
  return _.sortedUniq(
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

export function getDosesHeaderValues(selectedVaccinationCard: VaccinationCard) {
  const vaccinaDoseHeaderValues = [];
  for (const dataId of VACCINE_CARD_DOSES_HEADERS) {
    const data = _.find(
      selectedVaccinationCard.headers,
      (dataObject: VaccinationCardHeader) => dataObject?.id === dataId
    );
    const value = data ? data.name || "" : "";
    vaccinaDoseHeaderValues.push(value);
  }
  return vaccinaDoseHeaderValues;
}

export function getDosesRowValues(
  doses: any,
  selectedVaccinationCard: VaccinationCard
) {
  const vaccinaDoseRowValues = [];
  for (const doseIndex in doses) {
    const vaccinaDoseRow = [];
    const selectedDose: Array<VaccinationCardHeader> = _.filter(
      selectedVaccinationCard.headers || [],
      (headerConfig: VaccinationCardHeader) =>
        headerConfig.hasOwnProperty("doseIndex") &&
        `${headerConfig.doseIndex}` === `${doseIndex}`
    );
    const hasSelectedDoseEmpty =
      _.flattenDeep(
        _.map(selectedDose, (data: any) =>
          data?.value !== "" ? data.value : []
        )
      ).length === 0;
    if (!hasSelectedDoseEmpty) {
      for (const dataId of VACCINE_CARD_DOSES_HEADERS) {
        const data = _.find(
          selectedDose,
          (dataObject: VaccinationCardHeader) => dataObject?.id === dataId
        );
        const value = data ? data.value || "" : "";
        vaccinaDoseRow.push(value);
      }
      vaccinaDoseRowValues.push(vaccinaDoseRow);
    }
  }
  return vaccinaDoseRowValues;
}
