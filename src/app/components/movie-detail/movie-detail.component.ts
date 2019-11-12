import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { faList, faHeart, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { UtilService } from 'src/app/services/util.service';

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
  imgUrl = 'https://image.tmdb.org/t/p/w1400_and_h450_face';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private util: UtilService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      console.log(this.movieId);

      this.movieService.getMovieById(this.movieId).then(res => {
        console.log(res);
        this.movieDetails = res;
        // this.movieDetails.result.map(resultMap => ({
        //   original_name: resultMap.title
        // }));
        this.movieDetails.releaseYear = new Date(this.movieDetails.release_date).getFullYear();
        this.averagePercent = (this.movieDetails.vote_average * 10);
        this.averagePercentClass = `${this.averagePercent}, 100`;
        this.movieDetails.runtime = this.getRunTime(this.movieDetails.runtime);

        const image = this.imgUrl + this.movieDetails.backdrop_path;
        console.log(image);
        setTimeout(() => {
          Vibrant.from(image).getPalette((err, palette) => {
            console.log(palette);
            this.colorBackdrop = palette.DarkMuted.rgb.join(',');
          });
        }, 1000);

        // return this.colorVibrant
      });
    });
  }

  getRunTime(time) {
    return this.util.timeConvert(time);
  }

  getBackground() {
    if (this.movieDetails) {
      const fontColor = this.colorBackdrop ? '#fff' : '#000';

      // tslint:disable-next-line: one-variable-per-declaration
      const styles = {
        // background: 'rgba(' + this.colorVibrant + ', 0.2)',
        // color: fontColor,
        'background-image': 'url(' + this.imgUrl + this.movieDetails.backdrop_path + ')',
        ' background- image': 'url(' + this.imgUrl +
          this.movieDetails.backdrop_path + '), linear-gradient(rgba(' +
          this.colorBackdrop + ', 0.5), rgba(' + this.colorBackdrop + ', 0))'
      };
      return styles;
    }
  }

  getMoviesByGenre(id, name) {
    name = name.replace(' ', '-');
    this.router.navigateByUrl(`genre/${id}-${name}`);
  }

}
