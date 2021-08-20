import { Component, Input, OnInit } from "@angular/core";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
import * as _ from "lodash";
import {
  getDoseIndexes,
  getDosesHeaderValues,
  getDosesRowValues,
} from "../../helpers/get_selected_vaccine_card_data";

@Component({
  selector: "app-vaccine-card-dose",
  templateUrl: "./vaccine-card-dose.component.html",
  styleUrls: ["./vaccine-card-dose.component.css"],
})
export class VaccineCardDoseComponent implements OnInit {
  @Input() selectedVaccinationCard: VaccinationCard;

  vaccinaDoseRowValues: Array<any>;
  vaccinaDoseHeaderValues: Array<any>;

  constructor() {
    this.vaccinaDoseRowValues = [];
    this.vaccinaDoseHeaderValues = [];
  }

  ngOnInit(): void {
    if (this.selectedVaccinationCard && this.selectedVaccinationCard.headers) {
      const doses: any = getDoseIndexes(this.selectedVaccinationCard);
      this.vaccinaDoseRowValues = getDosesRowValues(
        doses,
        this.selectedVaccinationCard
      );
      this.vaccinaDoseHeaderValues = getDosesHeaderValues(
        this.selectedVaccinationCard
      );
    }
  }
}
