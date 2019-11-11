import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movies } from 'src/app/models/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesPopular: Movies;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMoviePopular();
  }

  async getMoviePopular() {
    await this.movieService.getMovieList().then(res => {
      console.log(res);
      this.moviesPopular = res;
      this.moviesPopular.results.map(resMap => {
        resMap.overview = resMap.overview.split(' ').splice(0, 20).join(' ');
      });
    });
    console.log(this.moviesPopular);
  }

}
