import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ISprint, ISprintResponse  } from 'shared/interfaces';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class DataService {
  baseUrl = '/api/sprint';

  constructor(private http: HttpClient){

  }

  getAllSprints(): Observable<ISprint[]> {
    return this.http.get<ISprint[]>(this.baseUrl)
        .pipe(
            map((sprints: ISprint[]) => {
              console.log(sprints);
              return sprints;
          }), catchError(this.handleError));

  }


  insertNewSprints(sprint: ISprint ): Observable<ISprint> {
    return this.http.post<ISprintResponse>(this.baseUrl, sprint)
    .pipe(map((data) => {
      console.log('insert costumers status class data service : ', data.status);
      return data.sprint;
    }), catchError(this.handleError));
  };


  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }
}
