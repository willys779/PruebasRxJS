import { Component, OnInit } from '@angular/core';
import { Observable, of, from, tap, map, Subject } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  myArray = [10, 20, 30];
  public myArrayOf$!: Observable<any>;
  public myArrayFrom$!: Observable<any>;
  public myArrayTap$!: Observable<any>;
  private subject = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    this.myArrayFrom$ = from(this.myArray);
    this.myArrayFrom$
    .pipe(
      map( data => data * 2)
    )
    .subscribe( data => console.log(data));

    this.myArrayFrom$ = from(this.myArray);
    this.myArrayFrom$
    .pipe(
      map( data => data * 2)
    )
    .subscribe( data => console.log(data));

    this.subject
    .pipe(
      tap(val => console.log(val))
    )
    .subscribe();
    this.subject.next(Math.random());
    this.subject.next(Math.random());
  }

}
