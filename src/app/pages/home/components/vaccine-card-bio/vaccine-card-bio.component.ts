import { Component, Input, OnInit } from "@angular/core";
import {
  VaccinationCard,
  VaccinationCardHeader,
} from "src/app/core/models/vaccination-card";

import * as _ from "lodash";

@Component({
  selector: "app-vaccine-card-bio",
  templateUrl: "./vaccine-card-bio.component.html",
  styleUrls: ["./vaccine-card-bio.component.css"],
})
export class VaccineCardBioComponent implements OnInit {
  @Input() selectedVaccinationCard: VaccinationCard;

  vaccineCardBioData: Array<any>;

  constructor() {
    this.vaccineCardBioData = [];
  }

  ngOnInit(): void {
    if (this.selectedVaccinationCard && this.selectedVaccinationCard.headers) {
      this.vaccineCardBioData = _.flattenDeep(
        _.map(
          _.filter(
            this.selectedVaccinationCard.headers || [],
            (headerConfig: VaccinationCardHeader) => headerConfig.isBioInfoCard
          ),
          (headerConfig: VaccinationCardHeader) => {
            return {
              name: headerConfig.displayName,
              value: headerConfig.value,
            };
          }
        )
      );
    }
  }
}
