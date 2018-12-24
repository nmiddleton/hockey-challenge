import {Component, Input} from '@angular/core';

@Component({
  selector: 'star-rating-component',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() setRating: number

}
