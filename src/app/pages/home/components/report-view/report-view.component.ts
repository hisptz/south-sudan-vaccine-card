import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { ErrorMessage } from "@iapps/ngx-dhis2-http-client";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { State } from "src/app/store/reducers";
import {
  getVaccinationCardDataError,
  getVaccinationCardDataLoadingStatus,
  getVaccinationCardList,
} from "src/app/store/selectors/vaccination-card.selector";

@Component({
  selector: "app-report-view",
  templateUrl: "./report-view.component.html",
  styleUrls: ["./report-view.component.css"],
})
export class ReportViewComponent implements OnInit, AfterViewInit {
  vaccinationCardList$: Observable<Array<VaccinationCard>>;
  vaccinationCardListError$: Observable<ErrorMessage>;
  vaccinationCardListLoading$: Observable<boolean>;

  @Output() vaccinationCardSelected = new EventEmitter();

  constructor(private store: Store<State>, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.vaccinationCardListError$ = this.store.select(
      getVaccinationCardDataError
    );
    this.vaccinationCardListLoading$ = this.store.select(
      getVaccinationCardDataLoadingStatus
    );
    this.vaccinationCardList$ = this.store.select(getVaccinationCardList);
  }

  onOpenVaccinationCard(selectedVaccinationCardId: string) {
    this.vaccinationCardSelected.emit(selectedVaccinationCardId);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
