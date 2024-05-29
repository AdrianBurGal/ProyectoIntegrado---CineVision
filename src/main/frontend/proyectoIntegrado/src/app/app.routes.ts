import {Routes} from '@angular/router';
import {HomeComponent} from "./components/appCinema/home/home.component";
import {AppAdminComponent} from "./components/appAdministration/app-admin.component";
import {ListFilmComponent} from "./components/appAdministration/film/list-film/list-film.component";
import {EditFilmComponent} from "./components/appAdministration/film/edit-film/edit-film.component";
import {DetailFilmComponent} from "./components/appAdministration/film/detail-film/detail-film.component";
import {CreateFilmComponent} from "./components/appAdministration/film/create-film/create-film.component";
import {LoginComponent} from "./components/appAdministration/login/login.component";
import {DetailsFilmComponent} from "./components/appCinema/details-film/details-film.component";
import {ListScheduleComponent} from "./components/appAdministration/schedule/list-schedule/list-schedule.component";
import {CreateScheduleComponent} from "./components/appAdministration/schedule/create-schedule/create-schedule.component";
import {DetailScheduleComponent} from "./components/appAdministration/schedule/detail-schedule/detail-schedule.component";
import {EditScheduleComponent} from "./components/appAdministration/schedule/edit-schedule/edit-schedule.component";
import {FilmTicketComponent} from "./components/appCinema/film-ticket/film-ticket.component";
import {ListActorComponent} from "./components/appAdministration/actor/list-actor/list-actor.component";
import {CreateActorComponent} from "./components/appAdministration/actor/create-actor/create-actor.component";
import {DetailActorComponent} from "./components/appAdministration/actor/detail-actor/detail-actor.component";
import {EditActorComponent} from "./components/appAdministration/actor/edit-actor/edit-actor.component";
import {ListDirectorComponent} from "./components/appAdministration/director/list-director/list-director.component";
import {CreateDirectorComponent} from "./components/appAdministration/director/create-director/create-director.component";
import {DetailDirectorComponent} from "./components/appAdministration/director/detail-director/detail-director.component";
import {EditDirectorComponent} from "./components/appAdministration/director/edit-director/edit-director.component";
import {ShowTicketComponent} from "./components/appCinema/show-ticket/show-ticket.component";

export const routes: Routes = [
  {path: '', title: 'CineVision', component: HomeComponent},
  {path: 'administration', title: 'Administration', component: AppAdminComponent},

  {path: 'administration/films', title: 'FilmsAdministration', component: ListFilmComponent},
  {path: 'administration/films/newFilm', title: 'CreateFilmAdministration', component: CreateFilmComponent},
  {path: 'administration/films/:id', title: 'DetailsFilmAdministration', component: DetailFilmComponent},
  {path: 'administration/films/replaceFilm/:id', title: 'ReplaceFilmAdministration', component: EditFilmComponent},

  {path: 'administration/actor', title: 'ActorAdministration', component: ListActorComponent},
  {path: 'administration/actor/newActor', title: 'CreateActorAdministration', component: CreateActorComponent},
  {path: 'administration/actor/:id', title: 'DetailsActorAdministration', component: DetailActorComponent},
  {path: 'administration/actor/replaceActor/:id', title: 'ReplaceActorAdministration', component: EditActorComponent},

  {path: 'administration/director', title: 'DirectorAdministration', component: ListDirectorComponent},
  {path: 'administration/director/newDirector', title: 'CreateDirectorAdministration', component: CreateDirectorComponent},
  {path: 'administration/director/:id', title: 'DetailsDirectorAdministration', component: DetailDirectorComponent},
  {path: 'administration/director/replaceDirector/:id', title: 'ReplaceDirectorAdministration', component: EditDirectorComponent},

  {path: 'administration/schedule', title: 'ScheduleAdministration', component: ListScheduleComponent},
  {path: 'administration/schedule/newSchedule', title: 'CreateScheduleAdministration', component: CreateScheduleComponent},
  {path: 'administration/schedule/:id', title: 'DetailsScheduleAdministration', component: DetailScheduleComponent},
  {path: 'administration/schedule/replaceSchedule/:id', title: 'ReplaceScheduleAdministration', component: EditScheduleComponent},

  {path: 'details/:id', title: 'Details film', component: DetailsFilmComponent},
  {path: 'movieTicket', title: 'Details film', component: FilmTicketComponent},
  {path: 'movieTicket/tickets', title: 'Tickets', component: ShowTicketComponent},

  {path: 'auth/login', title: 'Login', component: LoginComponent},
  // {path: 'signup', title: 'SignUp', component: SignupComponent},
];
