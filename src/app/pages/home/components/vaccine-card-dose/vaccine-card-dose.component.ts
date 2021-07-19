import { Component, Input, OnInit } from "@angular/core";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

@Component({
  selector: "app-vaccine-card-dose",
  templateUrl: "./vaccine-card-dose.component.html",
  styleUrls: ["./vaccine-card-dose.component.css"],
})
export class VaccineCardDoseComponent implements OnInit {
  @Input() doseIndex: number;
  @Input() selectedVaccinationCard: VaccinationCard;

  //@TODO sofycode columns for next dose date
  nextDoseDateId: string = "FFWcps4MfuH";

  constructor() {}

  ngOnInit(): void {
    console.log({
      selectedVaccinationCard: this.selectedVaccinationCard,
      doseIndex: this.doseIndex,
    });
  }
}
