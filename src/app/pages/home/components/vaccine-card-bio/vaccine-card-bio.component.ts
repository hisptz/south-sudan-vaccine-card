import { Component, Input, OnInit } from "@angular/core";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

import * as _ from "lodash";
import {
  getVaccineCardBioData,
} from "../../helpers/get_selected_vaccine_card_data";

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
      this.vaccineCardBioData = getVaccineCardBioData(
        this.selectedVaccinationCard
      );
    }
  }
}
