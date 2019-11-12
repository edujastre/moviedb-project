import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movies } from '../models/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();
  private baseUrl = environment.urlBase;
  private apikey = 'a26d8295626132e31ef949ff4ccef439';

  async getMovieList(discover?: string): Promise<Movies> {
    let result;
    discover = discover.replace('/', '');
    const type = discover ? discover : 'movie';
    await this.http.get<Movies>(this.baseUrl + `${type}/popular?api_key=${this.apikey}&language=en-US&page=1`).toPromise().then(res => {
      result = res;
    });

    return result;
  }

  async getMovieById(movieId): Promise<any> {
    let result;
    await this.http.get<any>(this.baseUrl + `movie/${movieId}?api_key=${this.apikey}`).toPromise().then(res => {
      result = res;

      this.getMovieCast(movieId).then(cast => result.cast = cast);
    });

    return result;
  }

  async getMovieCast(movieId): Promise<any> {
    let result;
    await this.http.get<any>(this.baseUrl + `movie/${movieId}/credits?api_key=${this.apikey}`).toPromise().then(res => {
      result = res;
    });

    return result;
  }

  async getMovieByGenre(genre): Promise<any> {
    let result;
    await this.http.get<any>(this.baseUrl + `discover/movie/?api_key=${this.apikey}&with_genres=${genre}`).toPromise().then(res => {
      result = res;
    });

    return result;
  }
}
