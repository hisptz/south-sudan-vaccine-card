import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VaccineCardQrCodeComponent } from "./vaccine-card-qr-code.component";

describe("VaccineCardQrCodeComponent", () => {
  let component: VaccineCardQrCodeComponent;
  let fixture: ComponentFixture<VaccineCardQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VaccineCardQrCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCardQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
