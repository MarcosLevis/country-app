import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholderInput = input('Buscar');
  searchValueEvent = output<string>();

  inputValue = signal<string>('')
}
