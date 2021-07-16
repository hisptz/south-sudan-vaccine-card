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
    vacinationCardData: Array<VaccinationCard>,
    filterKey: String
  ): Array<string[]> {
    return filterKey && filterKey != ""
      ? _.flattenDeep(
          _.map(vacinationCardData, (vacinationCard: VaccinationCard) => {
            const rowData = _.map(
              _.filter(
                vacinationCard.headers || [],
                (headerConfig: VaccinationCardHeader) =>
                  headerConfig.isVisibleOnList
              ),
              (headerConfig: VaccinationCardHeader) => headerConfig.value
            );
            console.log({ rowData });

            return vacinationCard;
          })
        )
      : vacinationCardData;
  }
}
