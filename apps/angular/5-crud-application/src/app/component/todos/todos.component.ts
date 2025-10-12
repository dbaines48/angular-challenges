import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Todo } from '../../model/todo.model';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  imports: [TodoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  todos = input.required<Todo[]>();
}
