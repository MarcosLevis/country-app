import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { Country } from '../../interfaces/country.interface';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [ CountrySearchInputComponent, CountryListComponent ],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  
  countryService = inject(CountryService)
  query = signal<string>('')
  
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request}) => {
      if ( !request.query ) return of([])
      return this.countryService.searchByName(request.query)
    }
  })

 }
