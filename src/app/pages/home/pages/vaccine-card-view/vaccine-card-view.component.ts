import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as _ from "lodash";
import { State } from "src/app/store/reducers";
import {
  getSelectedVaccinationCard,
  getSelectedVaccinationCardDosesIndex,
} from "src/app/store/selectors";
import { VaccinationCard } from "src/app/core/models/vaccination-card";

@Component({
  selector: "app-vaccine-card-view",
  templateUrl: "./vaccine-card-view.component.html",
  styleUrls: ["./vaccine-card-view.component.css"],
})
export class VaccineCardViewComponent implements OnInit {
  selectedVaccinationCard$: Observable<VaccinationCard>;
  vaccineDosesIndex$: Observable<VaccinationCard>;

  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit(): void {
    this.selectedVaccinationCard$ = this.store.select(
      getSelectedVaccinationCard
    );
    this.vaccineDosesIndex$ = this.store.select(
      getSelectedVaccinationCardDosesIndex
    );
  }

  onPrintVaccinaCard() {
    window.print();
  }

  onGoBackHome() {
    this.router.navigate([""]);
  }
}
