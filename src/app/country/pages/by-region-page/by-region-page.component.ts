import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { RouterLinkActive } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  imports: [ CountryListComponent,RouterLinkActive ],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  region = signal<Region | null>(null);
  regions = signal<Region[]>([
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ]);


  countryResource = rxResource({
    request: () => ({ region: this.region() }),
    loader: ({ request}) => {
      if ( !request.region ) return of([])
      return this.countryService.searchByRegion(request.region)
    }
  })

}
