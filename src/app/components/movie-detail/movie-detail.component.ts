import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { faList, faHeart, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';

const Vibrant = require('node-vibrant');

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  faList = faList;
  faHeart = faHeart;
  faBookmark = faBookmark;
  faStar = faStar;
  movieId: any;
  movieDetails: any;
  averagePercent: number;
  averagePercentClass: string;
  colorBackdrop: any;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      console.log(this.movieId);

      this.movieService.getMovieById(this.movieId).then(res => {
        console.log(res);
        this.movieDetails = res;
        this.movieDetails.releaseYear = new Date(this.movieDetails.release_date).getFullYear();
        this.averagePercent = (this.movieDetails.vote_average * 10);
        this.averagePercentClass = `${this.averagePercent}, 100`;

        const image = 'https://image.tmdb.org/t/p/w1400_and_h450_face'
          + this.movieDetails.backdrop_path;
        Vibrant.from(image).getPalette((err, palette) => {
          console.log(palette);
          this.colorBackdrop = palette.DarkMuted.rgb.join(',');

          console.log(palette.Vibrant.rgb.join(','));
        });
        // return this.colorVibrant
      });
    });
  }

  getBackground() {
    if (this.movieDetails) {

      // tslint:disable-next-line: one-variable-per-declaration
      const styles = {
        // background: 'rgba(' + this.colorVibrant + ', 0.2)',
        'background-image': 'url(https://image.tmdb.org/t/p/w1400_and_h450_face'
          + this.movieDetails.backdrop_path + ')',
        ' background- image': 'url(https://image.tmdb.org/t/p/w1400_and_h450_face'
          + this.movieDetails.backdrop_path + '), linear-gradient(rgba(' + this.colorBackdrop + ', 0.5), rgba(' + this.colorBackdrop + ', 0))' /* W3C */
      };
      return styles;
    }
  }

  getMoviesByGenre(id, name) {
    name = name.replace(' ', '-');
    this.router.navigateByUrl(`genre/${id}-${name}`);
  }

}
