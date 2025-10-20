import { Directive, input, Signal } from '@angular/core';
import { Todo } from '../model/todo.model';

type TodoContext = {
  $implicit: Signal<Todo>;
  disabled: boolean;
  moises: string;
};

type TemplateContext<T> = {
  $implicit: T;
  disabled: boolean;
  moises: string;
};

@Directive({
  selector: '[todo]',
})
export class TodoDirective<T> {
  todo = input.required<T>();
  static ngTemplateContextGuard<T>(
    _directive: TodoDirective<T>,
    context: unknown,
  ): context is TemplateContext<T> {
    return true;
  }
}
