import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ISprint, ISprintResponse  } from '../shared/interfaces';
import { map, catchError } from 'rxjs/operators';
// import { logger } from '../../../lib/graylog.js';


@Injectable()
export class DataService {
  baseUrl = '/api/sprint';

  constructor(private http: HttpClient) {

  }

  getAllSprints(): Observable<ISprint[]> {
    console.log('dataservice get all sprints');
    return this.http.get<ISprint[]>(this.baseUrl)
        .pipe(
            map((sprints: ISprint[]) => {
              console.log(sprints);
              // logger.log('get all sprints ', sprints);
              return sprints;
          }), catchError(this.handleError));

  }


  insertNewSprints(sprint: ISprint ): Observable<ISprint> {
    console.log('data service insert.sprint')
    console.log(sprint)
    return this.http.post<ISprintResponse>(this.baseUrl, sprint)
    .pipe(map((data) => {
      console.log('insert costumers status class data service : ', data.status);
      // logger.log('insert new sprints ', data);
      return data.sprint;
    }), catchError(this.handleError));
  };


  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      // logger.log('get all sprints ', errMessage);
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }

  deleteDataSprint(): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl)
    .pipe(catchError(this.handleError));
  }
}
