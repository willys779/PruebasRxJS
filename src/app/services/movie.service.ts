import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/apiResponse';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private api_url: string = `${environment.api_omdb_url}?apikey=${environment.api_omdb_key}`

  constructor(private http: HttpClient) { }

  getMovies(searchTerm: string): Observable<Movie[]> {
    return this.http.get<ApiResponse>(`${this.api_url}&s=${searchTerm}`)
      .pipe(
        map(response => {
          return response.Search;
        })
      );
  }
}
