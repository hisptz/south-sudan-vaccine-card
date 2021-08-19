import { Component, OnInit, Input } from "@angular/core";

import { VaccinationCard } from "src/app/core/models/vaccination-card";

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
    this.qrdCode = `name : Joseph Changlo\nGender : M\nAge : 30\n\n\nLink : https://github.com/`;
  }
}
