import { Component } from '@angular/core';
import { ComputePipe } from './compute.pipe';

@Component({
  selector: 'app-root',
  template: `
    <ol>
      @for (person of persons; track person) {
        <li>{{ person | compute: $index }}</li>
      }
    </ol>
  `,
  imports: [ComputePipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
