import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  host: {
    '[class]': 'classList()',
  },
  template: `
    <ng-content select="img"></ng-content>

    <section>
      @for (item of list(); track item.id) {
        <ng-template
          *ngTemplateOutlet="
            rowTemplate();
            context: { $implicit: item }
          "></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNew.emit()">
      Add
    </button>
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  public readonly list = input<T[] | null>(null);
  public readonly customClass = input('');

  public readonly addNew = output();

  public readonly rowTemplate = contentChild.required('itemRow', {
    read: TemplateRef,
  });

  protected classList = computed(
    () =>
      `flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4 ${this.customClass()}`,
  );
}
