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
import {
  getProgressPercentage,
  getSanitizedVaccinationCardData,
} from "src/app/core/helpers/vaccination-card-data.helpers";

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
    return new Observable((observer) => {
      this.getAllVaccinationCardData(vaccinationCardConfigs, selectedOrgUnits)
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  async getAllVaccinationCardData(
    vaccinationCardConfigs: any,
    selectedOrgUnits: Array<any>
  ) {
    const pageSize = 15;
    const vaccinationCardData = [];
    const fields = `fields=trackedEntityInstance,attributes[attribute,value],enrollments[program,orgUnit,events[eventDate,programStage,dataValues[dataElement,value]]]`;
    const urlsWithPaginations = [];
    try {
      let totalOverAllProcess = 0;
      let overAllProcessCount = 0;
      let bufferProcessCount = 0;
      const { headerConfigs, program, programStage } = vaccinationCardConfigs;
      const organisationUnits: any = await this.getAllOrganisationUnits();
      for (const selectedOrgUnit of selectedOrgUnits) {
        if (selectedOrgUnit && selectedOrgUnit.id) {
          const url = `trackedEntityInstances.json?ou=${selectedOrgUnit.id}&ouMode=DESCENDANTS&program=${program}`;
          const response: any = await this.getPaginationFiltersForTrackerData(
            url,
            pageSize
          );
          totalOverAllProcess += response.paginationFilters.length;
          urlsWithPaginations.push(response);
        }
      }
      for (const { url, paginationFilters } of _.flattenDeep(
        urlsWithPaginations
      )) {
        bufferProcessCount = 0;
        this.updateProgressStatus(
          bufferProcessCount,
          overAllProcessCount,
          totalOverAllProcess
        );
        for (const paginationFilter of paginationFilters) {
          bufferProcessCount++;
          this.updateProgressStatus(
            bufferProcessCount,
            overAllProcessCount,
            totalOverAllProcess
          );
          const response: any = await this.getVaccinationCardDataByPagination(
            `${url}&${fields}`,
            paginationFilter
          );
          overAllProcessCount++;
          this.updateProgressStatus(
            bufferProcessCount,
            overAllProcessCount,
            totalOverAllProcess
          );
          vaccinationCardData.push(
            getSanitizedVaccinationCardData(
              response,
              organisationUnits,
              headerConfigs,
              program,
              programStage
            )
          );
        }
      }
    } catch (error) {
      console.log({ error });
    }
    return _.uniqBy(_.flattenDeep(vaccinationCardData), "tei");
  }

  getVaccinationCardDataByPagination(url: string, paginationFilter: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(`${url}&${paginationFilter}`)
        .pipe(take(1))
        .subscribe(
          (data) => resolve(data["trackedEntityInstances"] || []),
          (error) => reject(error)
        );
    });
  }

  getAllOrganisationUnits() {
    const url =
      "organisationUnits.json?fields=id,name,level,ancestors[name,level]&paging=false";
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(url)
        .pipe(take(1))
        .subscribe(
          (data) => {
            const organisationUnits = _.map(
              data["organisationUnits"] || [],
              (organisationUnit: any) => {
                const { level, name, ancestors } = organisationUnit;
                ancestors.push({ name, level });
                return _.omit({ ...organisationUnit, ancestors }, [
                  "level",
                  "name",
                ]);
              }
            );
            resolve(organisationUnits);
          },
          () => reject([])
        );
    });
  }

  getPaginationFiltersForTrackerData(url: string, pageSize: number) {
    const paginationFilters = [];
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(`${url}&pageSize=1&totalPages=true&fields=none`)
        .pipe(take(1))
        .subscribe(
          (response) => {
            const pager = response.pager || {};
            const total = pager.total || pageSize;
            for (let page = 1; page <= Math.ceil(total / pageSize); page++) {
              paginationFilters.push(`pageSize=${pageSize}&page=${page}`);
            }
            resolve({
              url,
              paginationFilters: _.flattenDeep(paginationFilters),
            });
          },
          (error) => reject(error)
        );
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
