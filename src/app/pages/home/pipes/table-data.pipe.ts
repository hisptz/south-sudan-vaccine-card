import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
import {
  VaccinationCardHeader,
  VaccinationCard,
} from "src/app/core/models/vaccination-card";

@Pipe({
  name: "tableData",
})
export class TableDataPipe implements PipeTransform {
  transform(vacinationCarddata: Array<VaccinationCard>): Array<string[]> {
    console.log({ vacinationCarddata });
    return _.map(vacinationCarddata, (vacinationCard: VaccinationCard) =>
      _.map(
        _.filter(
          vacinationCard.headers || [],
          (headerConfig: VaccinationCardHeader) => headerConfig.isVisibleOnList
        ),
        (headerConfig: VaccinationCardHeader) => headerConfig.value
      )
    );
  }
}
