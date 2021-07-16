import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-selection',
  templateUrl: './current-selection.component.html',
  styleUrls: ['./current-selection.component.css']
})
export class CurrentSelectionComponent implements OnInit {

  @Input() selectedPeriods: Array<any>;
  @Input() selectedOrgUnits: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
