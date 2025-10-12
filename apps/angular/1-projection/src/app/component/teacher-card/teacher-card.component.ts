import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ItemRowDirective } from '../../directive/item-row.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (addNew)="addTeacher()">
      <img ngSrc="assets/img/teacher.png" priority height="200" width="200" />

      <ng-template [itemRow]="teachers()" let-teacher let-character="character">
        <app-list-item
          (delete)="deleteTeacher(teacher.id)" >
          {{character}}{{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent, ItemRowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  protected teachers = this.store.teachers;

  public ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  protected addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  protected deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
