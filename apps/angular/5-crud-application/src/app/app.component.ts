import { Component, inject } from '@angular/core';
import { TodosComponent } from './component/todos/todos.component';
import { TodosStore } from './data-access/todo.store';

@Component({
  imports: [TodosComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  protected readonly store = inject(TodosStore);

  protected todos = this.store.entities;
}
