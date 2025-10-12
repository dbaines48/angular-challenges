import { delay, Observable, of, switchMap, throwError } from 'rxjs';

export const failRandomly = <T>({
  request,
  errorMessage = 'Sorry! something went wrong',
}: {
  request: () => Observable<T>;
  errorMessage?: string;
}): Observable<T> => {
  const fail = Math.random() <= 0.5;
  const delayResponse = Math.random() <= 0.5;

  return of(true).pipe(
    switchMap(() => {
      if (fail) {
        return throwError(() => new Error(errorMessage));
      }
      return request();
    }),
    delay(delayResponse ? 2_000 : 0),
  );
};
