import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
describe(TodoComponent.name, () => {
  let fixture: ComponentFixture<TodoComponent>;
  let component: TodoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
