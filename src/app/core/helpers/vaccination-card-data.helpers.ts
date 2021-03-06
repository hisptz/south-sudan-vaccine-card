import * as _ from "lodash";
import { VaccinationCardHeader } from "../models/vaccination-card";
import { getFormattedDate } from "../utils/date-formatter.util";

export function getProgressPercentage(numerator: number, denominator: number) {
  const percentageValue = ((numerator / denominator) * 100).toFixed(0);
  return parseInt(percentageValue, 10);
}

export function getSanitizedVaccinationCardData(
  teiResponse: any,
  organisationUnits: Array<any>,
  programMetadata: any,
  headerConfigs: Array<VaccinationCardHeader>,
  program: string,
  programStage: string
) {
  return _.uniqBy(
    _.flattenDeep(
      _.map(teiResponse, (teiData: any) => {
        const { trackedEntityInstance, attributes, enrollments } = teiData;
        const enrollment = _.find(
          enrollments,
          (enrollmentObject: any) =>
            enrollmentObject &&
            enrollmentObject.program &&
            enrollmentObject.program == program
        );
        const orgUnit = enrollment.orgUnit || "";
        const vaccineDoses = _.reverse(
          _.sortBy(
            _.filter(
              enrollment.events || [],
              (eventObject: any) =>
                eventObject &&
                eventObject.eventDate &&
                eventObject.dataValues &&
                eventObject.dataValues.length > 0 &&
                eventObject.programStage &&
                eventObject.programStage == programStage
            ),
            ["eventdate"]
          )
        );
        if (enrollment && vaccineDoses.length > 0) {
          const headers: Array<VaccinationCardHeader> = _.map(
            headerConfigs,
            (headerConfig: VaccinationCardHeader) => {
              let value = getVaccinationCardListHeaderValue(
                headerConfig,
                attributes,
                vaccineDoses,
                organisationUnits,
                programMetadata,
                orgUnit
              );
              return {
                ...headerConfig,
                displayName:
                  headerConfig.displayName !== ""
                    ? headerConfig.displayName
                    : headerConfig.name,
                value,
              };
            }
          );
          return { headers, tei: trackedEntityInstance };
        } else {
          return [];
        }
      })
    ),
    "tei"
  );
}

function getVaccinationCardListHeaderValue(
  headerConfig: VaccinationCardHeader,
  attributes: any,
  vaccineDoses: any,
  organisationUnits: any,
  programMetadata: any,
  orgUnit: string
) {
  let value = "";
  if (headerConfig.organisationUnitLevel) {
    value = getOrganisationUnitNameByLevel(
      organisationUnits,
      headerConfig.organisationUnitLevel,
      orgUnit
    );
  } else if (!headerConfig.isDataElement) {
    value = getValueFromAttributes(attributes, headerConfig, value);
  } else if (
    headerConfig.hasOwnProperty("doseIndex") &&
    headerConfig.isDataElement
  ) {
    if (typeof vaccineDoses[headerConfig.doseIndex] !== "undefined") {
      const vaccineDose = vaccineDoses[headerConfig.doseIndex];
      value = getValueFromEventDataValue(vaccineDose, headerConfig, value);
    }
  } else if (
    !headerConfig.hasOwnProperty("doseIndex") &&
    headerConfig.isDataElement
  ) {
    for (const vaccineDose of vaccineDoses) {
      value = getValueFromEventDataValue(vaccineDose, headerConfig, value);
    }
  }
  if (value !== "") {
    if (headerConfig.isBoolean) {
      value = `${value}` === "true" ? "Yes" : "No";
    } else if (headerConfig.isDate) {
      value = getFormattedDate(value);
    } else {
      const filteredProgramField = _.find(
        programMetadata.fields || [],
        (programField) =>
          programField &&
          programField.id &&
          programField.optionSet &&
          programField.id === headerConfig.id
      );
      if (filteredProgramField) {
        const filterOption = _.find(
          filteredProgramField.optionSet.options || [],
          (option: any) => option && option.code && option.code === value
        );
        value =
          filterOption && filterOption.displayName
            ? filterOption.displayName
            : value;
      }
    }
  }
  return value;
}

function getValueFromAttributes(
  attributes: any,
  headerConfig: VaccinationCardHeader,
  value: string
) {
  const attributeObj = _.find(
    attributes,
    (data: any) => data && data.attribute && data.attribute == headerConfig.id
  );
  value = attributeObj && attributeObj.value ? attributeObj.value : value;
  return value;
}

function getValueFromEventDataValue(
  vaccineDose: any,
  headerConfig: VaccinationCardHeader,
  value: string
) {
  const dataValueObj = _.find(
    _.concat(vaccineDose.dataValues || [], [
      {
        dataElement: "eventDate",
        value: vaccineDose.eventDate || "",
      },
      {
        dataElement: "orgUnitName",
        value: vaccineDose.orgUnitName || "",
      },
    ]),
    (data: any) =>
      data && data.dataElement && data.dataElement == headerConfig.id
  );
  if (dataValueObj && value == "") {
    value = dataValueObj.value || value;
  }
  return value;
}

function getOrganisationUnitNameByLevel(
  organisationUnits: Array<any>,
  level: number,
  orgUnitId: string
) {
  let organisationUnitName = "";
  const organisationUnitObj = _.find(
    organisationUnits,
    (organisationUnit: any) =>
      organisationUnit &&
      organisationUnit.id &&
      organisationUnit.id === orgUnitId
  );
  if (organisationUnitObj && organisationUnitObj.ancestors) {
    const organisationUnit = _.find(
      organisationUnitObj.ancestors || [],
      (data: any) => data && data.level === level
    );
    organisationUnitName = organisationUnit
      ? organisationUnit.name || organisationUnitName
      : organisationUnitName;
  }
  return organisationUnitName;
}
