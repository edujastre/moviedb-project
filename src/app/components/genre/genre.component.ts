import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  moviesPopular: Movies;
  genreId: string;
  movieDetails: any;
  averagePercent: number;
  averagePercentClass: string;
  genre: string[];
  genreName: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genre = params.get('genre-id').split('-');
      this.genreId = this.genre[0];
      this.genreName = this.genre[1].replace(' ', '-');
      console.log(this.genreId);

      this.movieService.getMovieByGenre(this.genreId).then(res => {
        console.log(res);
        this.moviesPopular = res;
        // this.movieDetails.releaseYear = new Date(this.movieDetails.release_date).getFullYear();
        // this.averagePercent = (this.movieDetails.vote_average * 10);
        // this.averagePercentClass = `${this.averagePercent}, 100`;
      });
    });
  }

  async getMoviePopular() {
    await this.movieService.getMovieByGenre(28).then(res => {
      console.log(res);
      this.moviesPopular = res;
      this.moviesPopular.results.map(resMap => {
        resMap.overview = resMap.overview.split(' ').splice(0, 20).join(' ');
      });
    });
    console.log(this.moviesPopular);
  }

}
