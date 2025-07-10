import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from './../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheName = new Map<string, Country[]>();


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!); //of retorna un observable de lo que queramos devolver
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error('No se pudo obtener paises con ese query')
        );
      })
    );
  }

  searchByName(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCacheName.has(query)) {
       return of(this.queryCacheName.get(query)!)
    }

    console.log(`entrando al servidor por ${query}`)
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(countries => this.queryCacheName.set(query, countries)),
      // delay(3000),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error('No se pudo obtener paises con ese query')
        );
      })
    );
  }

  searchByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error('No se pudo obtener un pais con ese codigo ${code}')
        );
      })
    );
  }
}
