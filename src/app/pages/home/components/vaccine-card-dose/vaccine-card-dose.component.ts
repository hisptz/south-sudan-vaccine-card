import { Component, Input, OnInit } from "@angular/core";
import {
  VaccinationCard,
  VaccinationCardHeader,
} from "src/app/core/models/vaccination-card";
import * as _ from "lodash";

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
  nextDoseLabel : string = "";
  nextDoseDate : string = "";
  
  
  vaccinaDoseCard: Array<any>;

  constructor() {}

  ngOnInit(): void {
    if (this.selectedVaccinationCard && this.selectedVaccinationCard.headers) {
      const selectedDoseData: Array<VaccinationCardHeader> = _.filter(
        this.selectedVaccinationCard.headers || [],
        (headerConfig: VaccinationCardHeader) =>
          headerConfig.hasOwnProperty("doseIndex") &&
          headerConfig.doseIndex === this.doseIndex
      );
      if(selectedDoseData && selectedDoseData.length > 0){
        const nextDoseData = _.find(selectedDoseData, (data:VaccinationCardHeader)=> data.id ===  this.nextDoseDateId)
        if(nextDoseData){
          this.nextDoseLabel  = nextDoseData.displayName;
          this.nextDoseDate = nextDoseData.value;
        }
        this.vaccinaDoseCard = _.map(_.filter(selectedDoseData, (data:VaccinationCardHeader)=> data.id !==  this.nextDoseDateId),(data:VaccinationCardHeader)=>{
          return [data.displayName, data.value]
        } );
      }
    }
  }
}
