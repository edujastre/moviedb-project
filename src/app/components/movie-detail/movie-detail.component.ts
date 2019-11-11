import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movieId: any;
  movieDetails: any;
  averagePercent: number;
  averagePercentClass: string;

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
      });
    });
  }

  getBackground() {
    if (this.movieDetails) {
      return {
        'background-image': 'url(https://image.tmdb.org/t/p/w1400_and_h450_face'
          + this.movieDetails.backdrop_path + ')', opacity: '1'
      };
    }
  }

  getMoviesByGenre(id, name) {
    name = name.replace(' ', '-');
    this.router.navigateByUrl(`genre/${id}-${name}`);
  }

}
