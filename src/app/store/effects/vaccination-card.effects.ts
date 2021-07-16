import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import * as _ from "lodash";

import {
  AddVaccinationCardData,
  LoadVaccinationCardData,
  LoadVaccinationCardDataFail,
  UpdateVaccinationCardDataProgress,
} from "../actions";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { getFormattedDate } from "src/app/core/utils/date-formatter.util";
import { VaccinationCard } from "src/app/core/models/vaccination-card";
import { getProgressPercentage } from "src/app/core/helpers/vaccination-card-data.helpers";

@Injectable()
export class VaccinationCardDataEffects {
  LoadVaccinationCardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadVaccinationCardData),
      switchMap((actions) =>
        this.getVaccinationCardDataFromServer(actions).pipe(
          map((vaccinationCardData: Array<VaccinationCard>) =>
            AddVaccinationCardData({ vaccinationCardData })
          ),
          catchError((error: any) => of(LoadVaccinationCardDataFail({ error })))
        )
      )
    )
  );

  getVaccinationCardDataFromServer(parameters: any) {
    const { vaccinationCardConfigs, selectedOrgUnits } = parameters;
    // headerConfigs, program, program, programStage
    return new Observable((observer) => {
      console.log({ vaccinationCardConfigs, selectedOrgUnits });
      observer.next([]);
      observer.complete();
      //   this.getEventReportAnalyticData(analyticParameters, reportConfig)
      //     .then((data) => {
      //       observer.next(data);
      //       observer.complete();
      //     })
      //     .catch((error) => observer.error(error));
    });
  }

  updateProgressStatus(
    bufferProcessCount: number,
    overAllProcessCount: number,
    totalOverAllProcess: number
  ) {
    const bufferProgress = getProgressPercentage(
      bufferProcessCount,
      totalOverAllProcess
    );
    const overAllProgress = getProgressPercentage(
      overAllProcessCount,
      totalOverAllProcess
    );
    this.store.dispatch(
      UpdateVaccinationCardDataProgress({ overAllProgress, bufferProgress })
    );
  }

  constructor(
    private actions$: Actions,
    private httpClient: NgxDhis2HttpClientService,
    private store: Store<State>
  ) {}
}
