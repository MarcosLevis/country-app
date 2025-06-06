import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  countries = input.required<Country[]>()
 }
