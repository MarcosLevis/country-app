import { Component, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  imports: [ CountryListComponent, ],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent { 

  countries = signal<Country[]>([])


}
