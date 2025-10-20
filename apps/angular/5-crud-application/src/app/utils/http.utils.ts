import { delay, Observable, of, switchMap, throwError } from 'rxjs';

type FailRandomlyRequest<T> = {
  request: () => Observable<T>;
  errorMessage?: string;
};

export const failRandomly = <T>({
  request,
  errorMessage = 'Sorry! something went wrong',
}: FailRandomlyRequest<T>): Observable<T> => {
  const fail = Math.random() <= 0.01;
  const delayResponse = Math.random() <= 0.01;

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
