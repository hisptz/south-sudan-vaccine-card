import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { PeSelectionComponent } from '../../components/pe-selection/pe-selection.component';
import { OuSelectionComponent } from '../../components/ou-selection/ou-selection.component';
import { getDefaultOrganisationUnitSelections } from '../../helpers/get-dafault-selections';
import { State } from 'src/app/store/reducers';
import {
  getCurrentUserOrganisationUnits,
  isCurrentUserHasCountryLevelOrganisationUnit,
} from 'src/app/store/selectors';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedPeriods: Array<any>;
  selectedOrgUnitItems: Array<any>;
  isLoading$: Observable<boolean>;
  downloading: boolean;
  analytics$: Observable<any>;
  analyticsError$: Observable<any>;
  hasCountryLevelOrganisationUnit$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.hasCountryLevelOrganisationUnit$ = this.store.select(
      isCurrentUserHasCountryLevelOrganisationUnit
    );
    // this.isLoading$ = this.store.select(getCurrentAnalyticsLoadingStatus);
    // this.analytics$ = this.store.select(getCurrentAnalytics);
    // this.analyticsError$ = this.store.select(getCurrentAnalyticsError);
    this.downloading = false;
    this.selectedPeriods = [];
    this.store
      .select(getCurrentUserOrganisationUnits)
      .subscribe((userOrganisationUnits) => {
        if (
          !this.selectedOrgUnitItems &&
          userOrganisationUnits &&
          userOrganisationUnits.length > 0
        ) {
          this.selectedOrgUnitItems = getDefaultOrganisationUnitSelections(
            userOrganisationUnits
          );
        }
      });
  }
  
  openOrganisationUnitFilter() {
    const width = '800px';
    const height = '700px';
    const selectionDialog = this.dialog.open(OuSelectionComponent, {
      width,
      height,
      data: {
        selectedOrgUnitItems: this.selectedOrgUnitItems,
      },
    });
    selectionDialog.afterClosed().subscribe((dialogData: any) => {
      if (dialogData && dialogData.action) {
        this.selectedOrgUnitItems =
          dialogData.selectedOrgUnitItems.items || this.selectedOrgUnitItems;
      }
    });
  }

  openPeriodFilter() {
    const width = '800px';
    const height = '600px';
    const selectionDialog = this.dialog.open(PeSelectionComponent, {
      width,
      height,
      data: {
        selectedPeriods: this.selectedPeriods,
      },
    });
    selectionDialog.afterClosed().subscribe((dialogData: any) => {
      if (dialogData && dialogData.action && dialogData.action === 'UPDATE') {
        this.selectedPeriods =
          dialogData.selectedPeriods.items || this.selectedPeriods;
      }
    });
  }

  presentSnackBar(message: string, action = '') {
    this.snackbar.open(message, _.upperCase(action), {
      duration: 1000,
    });
  }

  
}
