import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from './../interfaces/country.interface';

export class CountryMapper {
  static mapRestCountryToCountry(rest: RESTCountry): Country {
    return {
      cca2: rest.cca2,
      flag: rest.flag,
      flagSvg: rest.flags.svg,
      name: rest.name.common,
      capital: rest.capital.join(','),
      population: rest.population,
    };
  }

  static mapRestCountryArrayToCountryArray(restCountrys: RESTCountry[]) {
    return restCountrys.map(this.mapRestCountryToCountry);
  }
}
