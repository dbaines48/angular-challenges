import { computed, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  prependEntity,
  removeEntity,
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../model/todo.model';
import { failRandomly } from '../utils/http.utils';
import { TodoService } from './todo.service';

type TodoState = {
  loadingTodos: boolean;
  performingAction: boolean;
  error: string | null;
};

const initialState: TodoState = {
  loadingTodos: false,
  performingAction: false,
  error: null,
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<Todo>(),
  withComputed(({ loadingTodos, performingAction }) => ({
    actionInProgress: computed(() => {
      const loading = loadingTodos();
      const performing = performingAction();
      return loading || performing;
    }),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadTodos: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { loadingTodos: true, error: null });
        }),
        switchMap(() =>
          failRandomly({
            request: () => todoService.fetchAll(),
            errorMessage: 'Something went wrong fetching todo list.',
          }).pipe(
            tapResponse({
              next: (todos: Todo[]) => {
                patchState(store, setAllEntities(todos), {
                  loadingTodos: false,
                });
              },
              error: (error: Error) => {
                patchState(store, {
                  loadingTodos: false,
                  error: error.message,
                });
              },
            }),
          ),
        ),
      ),
    ),
    createTodo: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { performingAction: true, error: null })),
        switchMap(() =>
          failRandomly({
            request: () =>
              todoService.create({
                userId: 1,
                title: randText(),
                completed: false,
              }),
            errorMessage: 'Something went wrong creating todo.',
          }).pipe(
            tapResponse({
              next: (todo: Todo) =>
                patchState(
                  store,
                  prependEntity({ ...todo, id: store.entities().length + 1 }),
                  {
                    performingAction: false,
                  },
                ),
              error: (error: Error) =>
                patchState(store, {
                  performingAction: false,
                  error: error.message,
                }),
            }),
          ),
        ),
      ),
    ),
    updateTodo: rxMethod<Todo>(
      pipe(
        tap(() => patchState(store, { performingAction: true, error: null })),
        switchMap((todo: Todo) =>
          failRandomly({
            request: () => todoService.update(todo),
            errorMessage: `Something went wrong updating todo #${todo.id}`,
          }).pipe(
            tapResponse({
              next: (todo: Todo) =>
                patchState(store, setEntity(todo), { performingAction: false }),
              error: (error: Error) =>
                patchState(store, {
                  performingAction: false,
                  error: error.message,
                }),
            }),
          ),
        ),
      ),
    ),
    toggleCompleted: rxMethod<Todo>(
      pipe(
        tap(() => patchState(store, { performingAction: true, error: null })),
        switchMap((todo: Todo) =>
          failRandomly({
            request: () => todoService.update(todo),
            errorMessage: `Something went wrong updating todo #${todo.id}`,
          }).pipe(
            tapResponse({
              next: (todo: Todo) =>
                patchState(store, removeEntity(todo.id), prependEntity(todo), {
                  performingAction: false,
                }),
              error: (error: Error) =>
                patchState(store, {
                  performingAction: false,
                  error: error.message,
                }),
            }),
          ),
        ),
      ),
    ),
    removeTodo: rxMethod<Todo>(
      pipe(
        tap(() => {
          patchState(store, { performingAction: true, error: null });
        }),
        switchMap((todo: Todo) =>
          failRandomly({
            request: () => todoService.delete(todo),
            errorMessage: `Something went wrong deleting Todo #${todo.id}`,
          }).pipe(
            tapResponse({
              next: () => {
                patchState(store, removeEntity(todo.id), {
                  performingAction: false,
                });
              },
              error: (error: Error) => {
                patchState(store, {
                  performingAction: false,
                  error: error.message,
                });
              },
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadTodos();
    },
  }),
);
