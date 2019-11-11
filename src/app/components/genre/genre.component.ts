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
  moviesList: any;
  genreId: string;
  averagePercent: number;
  averagePercentClass: string;
  genre: string[];
  genreName: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genre = params.get('genre-id').split('-');
      this.genreId = this.genre[0];
      this.genreName = this.genre.slice(1).join(' ');
      console.log(this.genreId);

      this.movieService.getMovieByGenre(this.genreId).then(res => {
        console.log(res);
        this.moviesList = res;
        this.moviesList.releaseYear = new Date(this.moviesList.release_date).getFullYear();
        this.averagePercent = (this.moviesList.vote_average * 10);
        this.averagePercentClass = `${this.averagePercent}, 100`;
      });
    });
  }

  async getMoviePopular() {
    await this.movieService.getMovieByGenre(28).then(res => {
      console.log(res);
      this.moviesList = res;
      this.moviesList.results.map(resMap => {
        resMap.overview = resMap.overview.split(' ').splice(0, 20).join(' ');
      });
    });
    console.log(this.moviesList);
  }

}
