import { Component, Input, OnInit } from "@angular/core";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

import * as _ from "lodash";
import {
  getVaccineCardBioLocation,
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
  location: string;

  constructor() {
    this.location = "";
    this.vaccineCardBioData = [];
  }

  ngOnInit(): void {
    if (this.selectedVaccinationCard && this.selectedVaccinationCard.headers) {
      this.location = getVaccineCardBioLocation(this.selectedVaccinationCard);
      this.vaccineCardBioData = getVaccineCardBioData(
        this.selectedVaccinationCard
      );
    }
  }
}
