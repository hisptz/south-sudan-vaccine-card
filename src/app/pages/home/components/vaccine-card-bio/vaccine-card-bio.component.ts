import { Component, Input, OnInit } from "@angular/core";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

import * as _ from "lodash";
import { getVaccineCardBioData } from "../../helpers/get_selected_vaccine_card_data";

@Component({
  selector: "app-vaccine-card-bio",
  templateUrl: "./vaccine-card-bio.component.html",
  styleUrls: ["./vaccine-card-bio.component.css"],
})
export class VaccineCardBioComponent implements OnInit {
  @Input() selectedVaccinationCard: VaccinationCard;

  isLoading: boolean;

  fullName: string;
  dateOfBirth: string;
  identificationNumber: string;

  constructor() {
    this.isLoading = true;
  }

  ngOnInit(): void {
    if (this.selectedVaccinationCard && this.selectedVaccinationCard.headers) {
      const vaccineCardBioData = getVaccineCardBioData(
        this.selectedVaccinationCard
      );
      this.fullName = this.getVaccineCardBioDataByKey(
        vaccineCardBioData,
        "fullName"
      );
      this.dateOfBirth = new Date(this.getVaccineCardBioDataByKey(
        vaccineCardBioData,
        "dateOfBirth"
      )).toDateString();
      this.identificationNumber = this.getVaccineCardBioDataByKey(
        vaccineCardBioData,
        "identificationNumber"
      );
      this.isLoading = false;
    }
  }

  getVaccineCardBioDataByKey(vaccineCardBioData: Array<any>, key: string) {
    const bioData = _.find(
      vaccineCardBioData,
      (vaccineCardBio: any) =>
        vaccineCardBio && vaccineCardBio.id && vaccineCardBio.id == key
    );
    return bioData && bioData.value ? bioData.value : "-";
  }
}
