import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from './../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Observable, map } from 'rxjs';

const API_URL = "https://restcountries.com/v3.1"

@Injectable({providedIn: 'root'})

export class CountryService {
    
    private http = inject(HttpClient)

    searchByCapital(query:string): Observable<Country[]>{
        query = query.toLowerCase()
        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
        .pipe(map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)))
    }
}