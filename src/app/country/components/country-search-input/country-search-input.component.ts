import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholderInput = input('Buscar');
  value = output<string>();
  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffet = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 300);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });


}
