import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
import {
  VaccinationCard,
  VaccinationCardHeader,
} from "src/app/core/models/vaccination-card";

@Pipe({
  name: "tableHeaders",
})
export class TableHeadersPipe implements PipeTransform {
  transform(value: any[]): string[] {
    const dataRow: VaccinationCard = value[0];
    return _.map(
      _.filter(
        dataRow.headers || [],
        (headerConfig: VaccinationCardHeader) => headerConfig.isVisibleOnList
      ),
      (headerConfig: VaccinationCardHeader) => headerConfig.label
    );
  }
}
