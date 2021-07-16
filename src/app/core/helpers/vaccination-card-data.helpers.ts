import * as _ from "lodash";
import {
  VaccinationCard,
  VaccinationCardHeader,
} from "../models/vaccination-card";

export function getProgressPercentage(numerator: number, denominator: number) {
  const percentageValue = ((numerator / denominator) * 100).toFixed(0);
  return parseInt(percentageValue, 10);
}

export function getSanitizedVaccinationCardData(
  teiResponse: any,
  organisationUnits: Array<any>,
  headerConfigs: Array<VaccinationCardHeader>,
  program: string,
  programStage: string
): Array<VaccinationCard> {
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
              (eventObject) =>
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
              // get data element && attributes option set and value types form programs
              let value = getVaccinationCardListHeaderValue(
                headerConfig,
                attributes,
                vaccineDoses,
                organisationUnits,
                orgUnit
              );
              return { ...headerConfig, value };
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
  vaccineDoes: any,
  organisationUnits: any,
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
    const attributeObj = _.find(
      attributes,
      (data) => data && data.attribute && data.attribute == headerConfig.id
    );
    value = attributeObj && attributeObj.value ? attributeObj.value : value;
  } else if (
    headerConfig.hasOwnProperty("doseIndex") &&
    headerConfig.isDataElement
  ) {
    console.log({ vaccineDoes });
  } else if (
    !headerConfig.hasOwnProperty("doseIndex") &&
    headerConfig.isDataElement
  ) {
    console.log({ headerConfig, vaccineDoes });
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
