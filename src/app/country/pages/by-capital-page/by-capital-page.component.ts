import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
    
  countryService = inject(CountryService)
  query = signal<string>('')

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request}) => {
      if ( !request.query ) return []

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      )
    }
  })




  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  // countries = signal<Country[]>([])

  // onSearch(query: string){
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true)
  //   this.isError.set(null)

  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false)
  //         this.countries.set(countries)
  //         console.log(countries)
  //       },
  //       error: (err) => {
  //         console.log(err) //este err es el que enviamos desde el service
  //         this.isLoading.set(false)
  //         this.countries.set([])
  //         this.isError.set(`No se encontró un país con esa capital: ${query}`)
  //       }
  //     })
  // }

}
