import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as _ from "lodash";
import { State } from "src/app/store/reducers";
import {
  getSelectedVaccinationCard,
  getSelectedVaccinationCardDosesIndex,
  getTotalVaccinationCardData,
} from "src/app/store/selectors";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { take } from "rxjs/operators";

@Component({
  selector: "app-vaccine-card-view",
  templateUrl: "./vaccine-card-view.component.html",
  styleUrls: ["./vaccine-card-view.component.css"],
})
export class VaccineCardViewComponent implements OnInit {
  selectedVaccinationCard$: Observable<VaccinationCard>;
  vaccineDosesIndex$: Observable<VaccinationCard>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.selectedVaccinationCard$ = this.store.select(
      getSelectedVaccinationCard
    );
    this.vaccineDosesIndex$ = this.store.select(
      getSelectedVaccinationCardDosesIndex
    );
    this.getCurrentTeiIdFromActiveRoute();
  }

  getCurrentTeiIdFromActiveRoute() {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      const { id: teiId } = params;
      this.store.select(getTotalVaccinationCardData).subscribe((count) => {
        if (!(count > 0)) {
          this.getAndSetCurrentVaccinatationCard(teiId);
        }
      });
    });
  }

  async getAndSetCurrentVaccinatationCard(teiId: string) {
    console.log({ teiId });
  }

  onPrintVaccinaCard() {
    window.print();
  }

  onGoBackHome() {
    this.router.navigate([""]);
  }
}
