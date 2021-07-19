import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VaccineCardDoseComponent } from "./vaccine-card-dose.component";

describe("VaccineCardDoseComponent", () => {
  let component: VaccineCardDoseComponent;
  let fixture: ComponentFixture<VaccineCardDoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VaccineCardDoseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCardDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
