import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

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

import { VaccineCardBioComponent } from "./components/vaccine-card-bio/vaccine-card-bio.component";
import { VaccineCardDoseComponent } from "./components/vaccine-card-dose/vaccine-card-dose.component";
import { TableListSearchPipe } from "./pipes/table-list-search.pipe";
import { VaccineCardHeaderComponent } from "./components/vaccine-card-header/vaccine-card-header.component";
import { QRCodeModule } from "angular2-qrcode";
import { VaccineCardQrCodeComponent } from "./components/vaccine-card-qr-code/vaccine-card-qr-code.component";

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
    VaccineCardBioComponent,
    VaccineCardDoseComponent,
    VaccineCardHeaderComponent,
    VaccineCardQrCodeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FormsModule,
    QRCodeModule,
  ],
  entryComponents: [],
})
export class HomeModule {}
