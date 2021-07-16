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
  transform(vacinationCard: VaccinationCard): Array<string[]> {
    return _.map(
      _.filter(
        vacinationCard.headers || [],
        (headerConfig: VaccinationCardHeader) => headerConfig.isVisibleOnList
      ),
      (headerConfig: VaccinationCardHeader) => headerConfig.value
    );
  }
}
