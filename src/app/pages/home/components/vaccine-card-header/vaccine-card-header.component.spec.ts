import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VaccineCardHeaderComponent } from "./vaccine-card-header.component";

describe("VaccineCardHeaderComponent", () => {
  let component: VaccineCardHeaderComponent;
  let fixture: ComponentFixture<VaccineCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VaccineCardHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
