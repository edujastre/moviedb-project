import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

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

  constructor(private route: ActivatedRoute, private movieService: MovieService, private utilService: UtilService) { }

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

        this.moviesList.results.map(resMap => {
          resMap.overview = resMap.overview.split(' ').splice(0, 20).join(' ');
          resMap.title = resMap.original_name ? resMap.original_name : resMap.title;
          resMap.release_date = this.utilService.dateName(new Date(
            resMap.first_air_date ? resMap.first_air_date : resMap.release_date
          ));
          console.log(resMap.release_date);
        });
      });
    });
  }

  async getMoviePopular() {
    await this.movieService.getMovieByGenre(28).then(res => {
      console.log(res);
      this.moviesList = res;
      this.moviesList.results.map(resMap => {
        resMap.overview = resMap.overview.split(' ').splice(0, 20).join(' ');
        resMap.title = resMap.original_name ? resMap.original_name : resMap.title;
        resMap.release_date = this.utilService.dateName(new Date(
          resMap.first_air_date ? resMap.first_air_date : resMap.release_date
        ));
        console.log(resMap.release_date);
      });
    });
    console.log(this.moviesList);
  }

}
