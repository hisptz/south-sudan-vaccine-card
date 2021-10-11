import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { OrgUnitFilterConfig } from "@iapps/ngx-dhis2-org-unit-filter";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { OrganisationUnit } from "src/app/core/models/organisation-unit";
import { SearchOrganisationUnit } from "src/app/store/actions";
import { State } from "src/app/store/reducers";
import { getOrganisationUnitList } from "src/app/store/selectors";

@Component({
  selector: "app-ou-selection",
  templateUrl: "./ou-selection.component.html",
  styleUrls: ["./ou-selection.component.css"],
})
export class OuSelectionComponent implements OnInit {
  orgUnitFilterConfig: OrgUnitFilterConfig;
  selectedOrgUnitItems = [];
  searchText:string = "";
  organisationUnits$: Observable<Array<OrganisationUnit>>;

  constructor(
    private dialogRef: MatDialogRef<OuSelectionComponent>,
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public selectionDialogData: any
  ) {
    this.organisationUnits$ = this.store.select(getOrganisationUnitList);
  }

  onSeachingOrganisationUnit(){
    this.store.dispatch(SearchOrganisationUnit({searchText: this.searchText}));
  }

  ngOnInit(): void {
    this.selectedOrgUnitItems = this.selectionDialogData.selectedOrgUnitItems;
    console.log({selectedOrgUnitItems : this.selectedOrgUnitItems})
    this.orgUnitFilterConfig = {
      singleSelection: false,
      showUserOrgUnitSection: false,
      showOrgUnitLevelGroupSection: false,
      showOrgUnitGroupSection: false,
      showOrgUnitLevelSection: true,
      reportUse: false,
      batchSize: 400,
      hideActionButtons: false,
      contentHeight: "400px",
      emitOnSelection: false,
    };
  }

  onFilterUpdate(selectedOrgUnitItems, action: string) {
    console.log({selectedOrgUnitItems, action})
    this.dialogRef.close({
      selectedOrgUnitItems,
      action,
    });
  }
}
