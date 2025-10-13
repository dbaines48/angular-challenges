import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoService } from './data-access/todo.service';
import { TodosStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';
describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let todoServiceSpy: jest.Mocked<TodoService>;

  const pendingTodo1: Todo = {
    id: 1,
    userId: 1,
    title: 'todo-1',
    completed: false,
  };
  const pendingTodo2: Todo = {
    id: 2,
    userId: 1,
    title: 'todo-2',
    completed: false,
  };
  const completedTodo1: Todo = {
    id: 3,
    userId: 1,
    title: 'todo-1',
    completed: true,
  };
  const completedTodo2: Todo = {
    id: 4,
    userId: 1,
    title: 'todo-2',
    completed: true,
  };
  const todos: Todo[] = [
    pendingTodo1,
    pendingTodo2,
    completedTodo1,
    completedTodo2,
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: TodoService,
          useValue: {
            fetchAll: jest.fn().mockReturnValue(of(todos)),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        TodosStore,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(TodoService) as jest.Mocked<TodoService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
