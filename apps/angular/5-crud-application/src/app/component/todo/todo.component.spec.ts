import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from '../../data-access/todo.service';
import { TodosStore } from '../../data-access/todo.store';
import { Todo } from '../../model/todo.model';
import { TodoComponent } from './todo.component';
describe(TodoComponent.name, () => {
  let fixture: ComponentFixture<TodoComponent>;
  let component: TodoComponent;

  const todo: Todo = {
    id: 1,
    userId: 1,
    title: 'todo-1',
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [
        {
          provide: TodoService,
          useValue: {
            fetchAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        TodosStore,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    fixture.componentRef.setInput('todo', todo);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeAll(() => {
    const randTextMock = jest.mock('@ngneat/falso', () => {
      randText: jest.fn();
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(TodoComponent.prototype.delete.name, () => {
    it('should delete', () => {
      const removeTodoSpy = jest.spyOn(component.store, 'removeTodo');
      component.delete();
      expect(removeTodoSpy).toHaveBeenCalled();
      expect(removeTodoSpy).toHaveBeenCalledWith(component.todo());
    });
  });

  describe(TodoComponent.prototype.randomUpdate.name, () => {
    it('should update', () => {
      const updateTodoSpy = jest.spyOn(component.store, 'updateTodo');
      component.randomUpdate();
      expect(updateTodoSpy).toHaveBeenCalled();
      expect(updateTodoSpy).toHaveBeenCalledWith({
        ...todo,
        title: expect.any(String),
      });
    });
  });

  describe(TodoComponent.prototype.toggleCompleted.name, () => {
    it('should toggle completed', () => {
      const updateTodoSpy = jest.spyOn(component.store, 'updateTodo');
      component.toggleCompleted();
      expect(updateTodoSpy).toHaveBeenCalled();
      expect(updateTodoSpy).toHaveBeenCalledWith({
        ...todo,
        completed: !todo.completed,
      });
    });
  });
});
