import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  http = inject(HttpClient);

  public fetchAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public create(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(
      'https://jsonplaceholder.typicode.com/todos',
      JSON.stringify(todo),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    );
  }

  public update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify(todo),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    );
  }

  public delete(todo: Todo): Observable<void> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }
}
