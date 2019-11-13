import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { GenreComponent } from './components/genre/genre.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: 'movie-detail/:id', component: MovieDetailComponent },
  { path: 'tv-detail/:id', component: MovieDetailComponent },
  { path: 'genre/:genre-id', component: GenreComponent },
  { path: '', component: HomeComponent},
  { path: '**', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
