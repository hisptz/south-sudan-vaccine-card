import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as _ from "lodash";
import { State } from "src/app/store/reducers";
import { getSelectedVaccinationCard } from "src/app/store/selectors";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { take } from "rxjs/operators";

@Component({
  selector: "app-vaccine-card-view",
  templateUrl: "./vaccine-card-view.component.html",
  styleUrls: ["./vaccine-card-view.component.css"],
})
export class VaccineCardViewComponent implements OnInit {
  selectedVaccinationCard$: Observable<VaccinationCard>;

  // @TODO softcopy number  suppored vaccine does
  vaccineDosesIndex = [0, 1, 2];

  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit(): void {
    this.selectedVaccinationCard$ = this.store.select(
      getSelectedVaccinationCard
    );
  }

  onPrintVaccinaCard() {
    window.print();
  }

  onGoBackHome() {
    this.router.navigate([""]);
  }
}
