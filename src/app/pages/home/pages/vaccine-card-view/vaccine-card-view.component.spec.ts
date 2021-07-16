import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VaccineCardViewComponent } from "./vaccine-card-view.component";

describe("VaccineCardViewComponent", () => {
  let component: VaccineCardViewComponent;
  let fixture: ComponentFixture<VaccineCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VaccineCardViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
