import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
import {
  VaccinationCard,
  VaccinationCardHeader,
} from "src/app/core/models/vaccination-card";

@Pipe({
  name: "tableListSearch",
})
export class TableListSearchPipe implements PipeTransform {
  transform(
    vacinationCarddata: Array<any>,
    filterKey: String
  ): Array<string[]> {
    console.log({ filterKey, vacinationCarddata });
    return filterKey && filterKey != "" ? [] : vacinationCarddata;
  }
}
