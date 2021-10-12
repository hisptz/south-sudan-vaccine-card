import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "src/app/store/reducers";
import {
  getCurrentOverAllProgress,
  getCurrentBufferProgress,
} from "src/app/store/selectors/vaccination-card.selector";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
})
export class LoaderComponent implements OnInit {
  bufferProgressValue$: Observable<number>;
  overallProgressValue$: Observable<number>;
  progressBarMode: string;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.progressBarMode = "buffer";
    this.overallProgressValue$ = this.store.select(getCurrentOverAllProgress);
    this.bufferProgressValue$ = this.store.select(getCurrentBufferProgress);
  }
}
