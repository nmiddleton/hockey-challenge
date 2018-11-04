import {Observable, of} from "rxjs";

export class serviceHelpers {


  static handleErrorAndContinue<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, 'failed', error); // log to console for now

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
