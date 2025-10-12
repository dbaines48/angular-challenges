import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ItemRowDirective } from '../../directive/item-row.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      (addNew)="addStudent()">
      <img ngSrc="assets/img/student.webp" height="200" width="200" />

      <ng-template [itemRow]="students()" let-student>
        <app-list-item
          (delete)="deleteStudent(student.id)" >
          #{{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent, ItemRowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  protected students = this.store.students;

  public ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  protected addStudent(): void {
    this.store.addOne(randStudent());
  }

  protected deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
