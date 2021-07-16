import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { pages } from "./pages";
import { OuSelectionComponent } from "./components/ou-selection/ou-selection.component";
import { PeSelectionComponent } from "./components/pe-selection/pe-selection.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { SelectionNamePipe } from "./pipes/selection-name.pipe";
import { TableHeadersPipe } from "./pipes/table-headers.pipe";
import { TableDataPipe } from "./pipes/table-data.pipe";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { PaginationPipe } from "./pipes/pagination.pipe";
import { CurrentSelectionComponent } from "./components/current-selection/current-selection.component";
import { ReportViewComponent } from "./components/report-view/report-view.component";
import { ReportTableComponent } from "./components/report-table/report-table.component";
import { TableListSearchPipe } from "./pipes/table-list-search.pipe";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ...pages,
    OuSelectionComponent,
    PeSelectionComponent,
    LoaderComponent,
    ReportViewComponent,
    CurrentSelectionComponent,
    SelectionNamePipe,
    TableHeadersPipe,
    TableDataPipe,
    PaginationComponent,
    PaginationPipe,
    ReportTableComponent,
    TableListSearchPipe,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule, FormsModule],
  entryComponents: [],
})
export class HomeModule {}
