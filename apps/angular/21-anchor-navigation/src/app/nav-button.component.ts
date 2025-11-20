/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

@Component({
  selector: 'nav-button',
  imports: [RouterLink],
  template: `
    <a [routerLink]="href()" [fragment]="anchor()">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  public href = input<string | readonly any[] | UrlTree | null | undefined>('');
  public anchor = input<string | undefined>();
}
