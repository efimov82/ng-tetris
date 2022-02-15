import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'next-shape',
  templateUrl: './next-shape.component.html',
  styleUrls: ['./next-shape.component.scss'],
})
export class NextShapeComponent implements OnInit {
  @Input() shape$!: Observable<string | undefined>;

  ngOnInit() {
    this.shape$.subscribe((data) => {
      console.log(data);
    });
  }
}
