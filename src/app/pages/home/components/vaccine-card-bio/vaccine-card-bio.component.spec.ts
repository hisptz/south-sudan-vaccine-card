import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VaccineCardBioComponent } from "./vaccine-card-bio.component";

describe("VaccineCardBioComponent", () => {
  let component: VaccineCardBioComponent;
  let fixture: ComponentFixture<VaccineCardBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VaccineCardBioComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCardBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
