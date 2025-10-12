import { Component, computed, inject } from '@angular/core';
import { TodosComponent } from './component/todos/todos.component';
import { TodosStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';

@Component({
  imports: [TodosComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  public readonly store = inject(TodosStore);

  public todos = this.store.entities;

  public pendingTodos = computed(() =>
    this.todos().filter((todo: Todo) => !todo.completed),
  );
  public completedTodos = computed(() =>
    this.todos().filter((todo: Todo) => todo.completed),
  );
}
