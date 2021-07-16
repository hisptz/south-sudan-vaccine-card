import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { VaccineCardViewComponent } from "./pages/vaccine-card-view/vaccine-card-view.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "vaccine-card-view",
    component: VaccineCardViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
