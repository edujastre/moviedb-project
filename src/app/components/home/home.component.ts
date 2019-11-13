import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MovieService } from 'src/app/services/movie.service';
import { Movies } from 'src/app/models/movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesPopular: Movies;
  type: any;

  constructor(private movieService: MovieService, private location: Location, private router: Router) {
    this.router.events.subscribe((val) => {
      console.log(val, location.path());
      this.type = location.path();
      if (this.location.path() !== '') {
        this.type = location.path();
      } else {
        this.type = 'movie';
      }
    });
  }

  ngOnInit() {
    this.getMoviePopular();
  }

  dateName(dt) {
    const mlist =
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${mlist[dt.getMonth()]}, ${dt.getDay()}, ${dt.getFullYear()}`;
  }

  async getMoviePopular() {

    await this.movieService.getMovieList(this.type).then(res => {
      console.log(res);
      this.moviesPopular = res;
      this.moviesPopular.results.map(resMap => {
        resMap.overview = resMap.overview.split(' ').splice(0, 20).join(' ');
        resMap.title = resMap.original_name ? resMap.original_name : resMap.title;
        resMap.release_date = this.dateName(new Date(
          resMap.first_air_date ? resMap.first_air_date : resMap.release_date
        ));
      });
    });
    console.log(this.moviesPopular);
  }

}
