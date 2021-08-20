import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";

import { VaccinationCard } from "src/app/core/models/vaccination-card";
import {
  getDoseIndexes,
  getQrCodeBioData,
  getQrCodeDosesData,
} from "../../helpers/get_selected_vaccine_card_data";

@Component({
  selector: "app-vaccine-card-qr-code",
  templateUrl: "./vaccine-card-qr-code.component.html",
  styleUrls: ["./vaccine-card-qr-code.component.css"],
})
export class VaccineCardQrCodeComponent implements OnInit {
  @Input() selectedVaccinationCard: VaccinationCard;

  qrdCode: string;

  constructor() {}

  ngOnInit(): void {
    if (this.selectedVaccinationCard && this.selectedVaccinationCard.headers) {
      const vaccineCardUrl = window?.location?.href || "";
      const doses: any = getDoseIndexes(this.selectedVaccinationCard);
      const bioData = getQrCodeBioData(this.selectedVaccinationCard);
      const vaccineDose = getQrCodeDosesData(
        doses,
        this.selectedVaccinationCard
      );
      this.qrdCode = `${bioData}\n\n${vaccineDose}`;
      this.qrdCode += vaccineCardUrl ? `\n\n\n${vaccineCardUrl}` : "";
    }
  }
}
