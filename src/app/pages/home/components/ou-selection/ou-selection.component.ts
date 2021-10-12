import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { OrganisationUnit } from "src/app/core/models/organisation-unit";
import { OrgUnitFilterConfig } from "src/app/ngx-dhis2-org-unit-filter/models/org-unit-filter-config.model";
import { SearchOrganisationUnit } from "src/app/store/actions";
import { State } from "src/app/store/reducers";
import { getOrganisationUnitList, isSearchingOrganisationUnitActive,getOrganisationUnitLoadingStatus } from "src/app/store/selectors";

@Component({
  selector: "app-ou-selection",
  templateUrl: "./ou-selection.component.html",
  styleUrls: ["./ou-selection.component.css"],
})
export class OuSelectionComponent implements OnInit {
  orgUnitFilterConfig: OrgUnitFilterConfig;
  selectedOrgUnitItems = [];
  searchText: string = "";
  organisationUnits$: Observable<Array<OrganisationUnit>>;
  isSeachingActive$ :Observable<boolean>;
  isOrganisationUnitLoading$ :Observable<boolean>

  constructor(
    private dialogRef: MatDialogRef<OuSelectionComponent>,
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public selectionDialogData: any
  ) {
    this.organisationUnits$ = this.store.select(getOrganisationUnitList);
    this.isSeachingActive$ = this.store.select(isSearchingOrganisationUnitActive);
    this.isOrganisationUnitLoading$ = this.store.select(getOrganisationUnitLoadingStatus);
  }

  onSeachingOrganisationUnit() {
    this.store.dispatch(
      SearchOrganisationUnit({ searchText: this.searchText })
    );
  }

  ngOnInit(): void {
    this.selectedOrgUnitItems = this.selectionDialogData.selectedOrgUnitItems;
    this.orgUnitFilterConfig = {
      singleSelection: false,
      showUserOrgUnitSection: false,
      showOrgUnitLevelGroupSection: false,
      showOrgUnitGroupSection: false,
      showOrgUnitLevelSection: true,
      reportUse: false,
      batchSize: 400,
    };
  }

  onFilterUpdate(selectedOrgUnitItems, action: string) {
    console.log({ selectedOrgUnitItems, action });
    this.dialogRef.close({
      selectedOrgUnitItems,
      action,
    });
  }
}
