import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import * as _ from "lodash";

import * as vaccinationCardConfigs from "src/app/core/configs/vaccination-card-config.json";
import { OuSelectionComponent } from "../../components/ou-selection/ou-selection.component";
import { getDefaultOrganisationUnitSelections } from "../../helpers/get-dafault-selections";
import { State } from "src/app/store/reducers";
import {
  getCurrentUserOrganisationUnits,
  getVaccinationCardDataLoadingStatus,
} from "src/app/store/selectors";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ClearVaccinationCardData,
  LoadVaccinationCardData,
  SetSelectedVaccinationCard,
} from "src/app/store/actions";
import { PeSelectionComponent } from "../../components/pe-selection/pe-selection.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  selectedOrgUnits: Array<any>;
  selectedPeriods: Array<any>;
  isLoading$: Observable<boolean>;
  shouldGenerateReport: boolean;

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.isLoading$ = this.store.select(getVaccinationCardDataLoadingStatus);
  }

  ngOnInit() {
    this.selectedPeriods = [];
    this.store
      .select(getCurrentUserOrganisationUnits)
      .subscribe((userOrganisationUnits) => {
        if (
          !this.selectedOrgUnits &&
          userOrganisationUnits &&
          userOrganisationUnits.length > 0
        ) {
          this.selectedOrgUnits = getDefaultOrganisationUnitSelections(
            userOrganisationUnits
          );
          this.updateGenerateReportButtonStatus();
        }
      });
  }

  updateGenerateReportButtonStatus() {
    this.shouldGenerateReport = this.selectedOrgUnits.length > 0;
  }

  openOrganisationUnitFilter() {
    const width = "800px";
    const height = "700px";
    const selectionDialog = this.dialog.open(OuSelectionComponent, {
      width,
      height,
      data: {
        selectedOrgUnitItems: this.selectedOrgUnits,
      },
    });
    selectionDialog.afterClosed().subscribe((dialogData: any) => {
      if (dialogData && dialogData.action) {
        this.selectedOrgUnits =
          dialogData.selectedOrgUnitItems.items || this.selectedOrgUnits;
        this.updateGenerateReportButtonStatus();
      }
    });
  }

  openPeriodFilter() {
    const width = "800px";
    const height = "400px";
    const selectionDialog = this.dialog.open(PeSelectionComponent, {
      width,
      height,
      data: {
        selectedPeriods: this.selectedPeriods,
      },
    });
    selectionDialog.afterClosed().subscribe((dialogData: any) => {
      if (dialogData && dialogData.action && dialogData.action === "UPDATE") {
        this.selectedPeriods =
          dialogData.selectedPeriods.items || this.selectedPeriods;
      }
    });
  }

  openGenerateReport() {
    this.store.dispatch(ClearVaccinationCardData());
    this.store.dispatch(
      LoadVaccinationCardData({
        vaccinationCardConfigs: {
          ...{},
          headerConfigs: vaccinationCardConfigs.headers,
          program: vaccinationCardConfigs.programId,
          programStage: vaccinationCardConfigs.programStageId,
        },
        selectedOrgUnits: this.selectedOrgUnits,
        selectedPeriods: this.selectedPeriods,
      })
    );
  }

  onOpenVaccinationCard(selectedVaccinationCardId: string) {
    this.store.dispatch(
      SetSelectedVaccinationCard({ selectedVaccinationCardId })
    );
    this.router.navigate(["vaccine-card-view"], {
      queryParams: { id: selectedVaccinationCardId },
    });
  }

  presentSnackBar(message: string, action = "") {
    this.snackbar.open(message, _.upperCase(action), {
      duration: 1000,
    });
  }
}
