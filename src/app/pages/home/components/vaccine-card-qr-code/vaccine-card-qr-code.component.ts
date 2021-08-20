import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";

import { VaccinationCard } from "src/app/core/models/vaccination-card";
import {
  getDoseIndexes,
  getDosesHeaderValues,
  getDosesRowValues,
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
      const doses: any = getDoseIndexes(this.selectedVaccinationCard);
      const vaccinaDoseRowValues: any = getDosesRowValues(
        doses,
        this.selectedVaccinationCard
      );
      const vaccinaDoseHeaderValues = getDosesHeaderValues(
        this.selectedVaccinationCard
      );
      const vaccineCardUrl = window?.location?.href || "";
      const vaccineDose = _.join(
        _.flattenDeep(
          _.map(vaccinaDoseRowValues, (vaccinaDoseRow) => {
            return _.join(
              _.flattenDeep(
                _.map(vaccinaDoseHeaderValues, (vaccinaDoseHeader) => {
                  const index = _.indexOf(
                    vaccinaDoseHeaderValues,
                    vaccinaDoseHeader
                  );
                  const value = vaccinaDoseRow[index] || "";
                  return `${vaccinaDoseHeader} : ${value}`;
                })
              ),
              ", "
            );
          })
        ),
        "\n\n"
      );
      this.qrdCode = `name : Joseph Changlo\nGender : M\nAge : 30\n${vaccineDose}`;
      this.qrdCode += vaccineCardUrl ? `\n\n\n${vaccineCardUrl}` : "";
    }
  }
}
