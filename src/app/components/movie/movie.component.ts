import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinct, filter, fromEvent, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild("movieSearchInput") movieSearchInput!: ElementRef;
  movies: any[] = [];
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
      //this.movieSuscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.movies$ = fromEvent<Event>(this.movieSearchInput.nativeElement, "keyup")
      .pipe(
        map((event: Event) => {
          const searchTerm = (event.target as HTMLInputElement).value;
          return searchTerm;
        }),
        filter(
          (searchTerm: string) => {
            return searchTerm.length > 3
          }
        ),
        debounceTime(500),
        distinct(),
        switchMap((searchTerm: string) => {
          return this.movieService.getMovies(searchTerm);
        })
      );  
  }
}
