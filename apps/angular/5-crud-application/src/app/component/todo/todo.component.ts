import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodosStore } from '../../data-access/todo.store';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  host: {
    class: 'todo',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  store = inject(TodosStore);

  todo = input.required<Todo>();

  delete() {
    this.store.removeTodo(this.todo());
  }

  randomUpdate() {
    const todo = this.todo();
    this.store.updateTodo({ ...todo, title: randText() });
  }

  toggleCompleted() {
    const todo = this.todo();
    this.store.updateTodo({ ...todo, completed: !todo.completed });
  }
}
