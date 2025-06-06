import { Component, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { Country } from '../../interfaces/country.interface';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-country-page',
  imports: [ CountrySearchInputComponent, CountryListComponent ],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

   searchValue: string = ('')
   
   countries = signal<Country[]>([])
   
   onSearch(value: string){
      this.searchValue = value;
   }

 }
