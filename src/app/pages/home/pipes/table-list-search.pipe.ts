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
    searchText: String
  ): Array<string[]> {
    return searchText && searchText != ""
      ? _.filter(vacinationCardData, (vacinationCard: VaccinationCard) => {
        const rowData = _.map(
          vacinationCard.headers || [],
          (headerConfig: VaccinationCardHeader) => `${headerConfig.value}`.toLowerCase()
        );
        const searchKeys = _.filter(_.map(searchText.toLowerCase().split(" "), key=> key.trim()), key=>key!=="");
        for(const key of searchKeys){
          for(const value of rowData){
            if(_.startsWith(value,key)){
              return true;
            }
          }
        }
        return false
      })
      : vacinationCardData;
  }
}
