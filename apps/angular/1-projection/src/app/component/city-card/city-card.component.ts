import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ItemRowDirective } from '../../directive/item-row.directive';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      (addNew)="addCity()">
      <img ngSrc="assets/img/city.png" height="200" width="200" />

      <ng-template [itemRow]="cities()" let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          !{{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent, ItemRowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  protected cities = this.store.cities;

  public ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities: City[]) =>
      this.store.addAll(cities),
    );
  }

  protected addCity(): void {
    this.store.addOne(randomCity());
  }

  protected deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
