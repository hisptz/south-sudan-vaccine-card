import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { TablePagination } from "src/app/shared/models/table-pagination.model";

@Component({
  selector: "app-report-table",
  templateUrl: "./report-table.component.html",
  styleUrls: ["./report-table.component.css"],
})
export class ReportTableComponent implements OnInit, AfterViewInit {
  tablePagination: TablePagination;
  public searchText: string;
  @Input() vaccinationCardList: Array<VaccinationCard>;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tablePagination = null;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  onApplyPagination(pagination: TablePagination) {
    this.tablePagination = pagination;
  }
}
