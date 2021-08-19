import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as _ from "lodash";

import * as vaccinationCardConfigs from "src/app/core/configs/vaccination-card-config.json";
import { State } from "src/app/store/reducers";
import {
  getSelectedVaccinationCard,
  getTotalVaccinationCardData,
} from "src/app/store/selectors";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { take } from "rxjs/operators";
import {
  ClearVaccinationCardData,
  LoadVaccinationCardDataById,
} from "src/app/store/actions";

@Component({
  selector: "app-vaccine-card-view",
  templateUrl: "./vaccine-card-view.component.html",
  styleUrls: ["./vaccine-card-view.component.css"],
})
export class VaccineCardViewComponent implements OnInit {
  selectedVaccinationCard$: Observable<VaccinationCard>;

  isVaccinationListLoaded: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {
    this.isVaccinationListLoaded = false;
  }

  ngOnInit(): void {
    this.selectedVaccinationCard$ = this.store.select(
      getSelectedVaccinationCard
    );
    this.getCurrentTeiIdFromActiveRoute();
  }

  getCurrentTeiIdFromActiveRoute() {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      const { id: teiId } = params;
      this.store.select(getTotalVaccinationCardData).subscribe((count) => {
        this.isVaccinationListLoaded = count > 0;
        if (!(count > 0)) {
          this.getAndSetCurrentVaccinatationCard(teiId);
        }
      });
    });
  }

  async getAndSetCurrentVaccinatationCard(seletectedTeiId: string) {
    this.store.dispatch(
      LoadVaccinationCardDataById({
        vaccinationCardConfigs: {
          ...{},
          headerConfigs: vaccinationCardConfigs.headers,
          program: vaccinationCardConfigs.programId,
          programStage: vaccinationCardConfigs.programStageId,
        },
        seletectedTeiId,
      })
    );
  }

  onPrintVaccinaCard() {
    window.print();
  }

  onGoBackHome() {
    if (!this.isVaccinationListLoaded) {
      this.store.dispatch(ClearVaccinationCardData());
    }
    this.router.navigate([""]);
  }
}
