import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { OrganisationUnit } from "src/app/core/models/organisation-unit";
import {
  AddOrganisationUnitData,
  LoadOrganisationUnit,
  LoadOrganisationUnitFail,
} from "../actions";
import * as _ from "lodash";

@Injectable()
export class OrganisationUnitsEffects implements OnInitEffects {
  LoadOrganisationUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadOrganisationUnit),
      switchMap(() =>
        this.httpClient
          .get(
            "organisationUnits.json?fields=id,name,level,ancestors[name,level]&paging=false"
          )
          .pipe(
            map((response) => {
              return _.map(
                response.organisationUnits || [],
                (organisationUnit) => {
                  const { name, level } = organisationUnit;
                  const ancestors = _.concat(organisationUnit.ancestors || [], {
                    name,
                    level,
                  });
                  const diplayName = _.join(
                    _.uniq(
                      _.filter(
                        _.flattenDeep(
                          _.map(ancestors, (ancestor:any) => ancestor.name || "")
                        ),
                        (name :string) => name !== ""
                      )
                    ),
                    " > "
                  );
                  return { ...organisationUnit, diplayName };
                }
              );
            })
          )
          .pipe(
            map((organisationUnits: Array<OrganisationUnit>) =>
              AddOrganisationUnitData({ organisationUnits })
            ),
            catchError((error: any) => of(LoadOrganisationUnitFail({ error })))
          )
      )
    )
  );

  ngrxOnInitEffects() {
    return LoadOrganisationUnit();
  }

  constructor(
    private actions$: Actions,
    private httpClient: NgxDhis2HttpClientService
  ) {}
}
