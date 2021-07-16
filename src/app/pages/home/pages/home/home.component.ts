import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import * as _ from "lodash";

import * as vaccinationCardConfigs from "src/app/core/configs/vaccination-card-config.json";

import { PeSelectionComponent } from "../../components/pe-selection/pe-selection.component";
import { OuSelectionComponent } from "../../components/ou-selection/ou-selection.component";
import { getDefaultOrganisationUnitSelections } from "../../helpers/get-dafault-selections";
import { State } from "src/app/store/reducers";
import { getCurrentUserOrganisationUnits } from "src/app/store/selectors";
import { take } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { getVaccinationCardDataLoadingStatus } from "src/app/store/selectors/vaccination-card-selector";
import {
  ClearVaccinationCardData,
  LoadVaccinationCardData,
} from "src/app/store/actions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  selectedPeriods: Array<any>;
  selectedOrgUnits: Array<any>;
  isLoading$: Observable<boolean>;
  shouldGenerateReport: boolean;

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getVaccinationCardDataLoadingStatus);
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
    this.shouldGenerateReport =
      this.selectedOrgUnits.length > 0 && this.selectedPeriods.length > 0;
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

  openGenerateReport() {
    this.store.dispatch(ClearVaccinationCardData());
    this.store.dispatch(
      LoadVaccinationCardData({
        vaccinationCardConfigs,
        selectedOrgUnits: this.selectedOrgUnits,
        selectedPeriods: this.selectedPeriods,
      })
    );
  }

  openPeriodFilter() {
    const width = "800px";
    const height = "600px";
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
        this.updateGenerateReportButtonStatus();
      }
    });
  }

  presentSnackBar(message: string, action = "") {
    this.snackbar.open(message, _.upperCase(action), {
      duration: 1000,
    });
  }
}
