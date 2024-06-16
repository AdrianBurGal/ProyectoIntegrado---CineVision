import {Routes} from '@angular/router';
import {HomeComponent} from "./components/appCinema/home/home.component";
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
import {PurchaseComponent} from "./components/appCinema/purchase/purchase.component";
import {ListActorComponent} from "./components/appAdministration/actor/list-actor/list-actor.component";
import {CreateActorComponent} from "./components/appAdministration/actor/create-actor/create-actor.component";
import {DetailActorComponent} from "./components/appAdministration/actor/detail-actor/detail-actor.component";
import {EditActorComponent} from "./components/appAdministration/actor/edit-actor/edit-actor.component";
import {ListDirectorComponent} from "./components/appAdministration/director/list-director/list-director.component";
import {CreateDirectorComponent} from "./components/appAdministration/director/create-director/create-director.component";
import {DetailDirectorComponent} from "./components/appAdministration/director/detail-director/detail-director.component";
import {EditDirectorComponent} from "./components/appAdministration/director/edit-director/edit-director.component";
import {ShowTicketComponent} from "./components/appCinema/show-ticket/show-ticket.component";
import {SignUpComponent} from "./components/appAdministration/sign-up/sign-up.component";
import {ListGenreComponent} from "./components/appAdministration/genre/list-genre/list-genre.component";
import {CreateGenreComponent} from "./components/appAdministration/genre/create-genre/create-genre.component";
import {DetailGenreComponent} from "./components/appAdministration/genre/detail-genre/detail-genre.component";
import {EditGenreComponent} from "./components/appAdministration/genre/edit-genre/edit-genre.component";
import {ListTicketComponent} from "./components/appAdministration/ticket/list-ticket/list-ticket.component";
import {CreateTicketComponent} from "./components/appAdministration/ticket/create-ticket/create-ticket.component";
import {DetailTicketComponent} from "./components/appAdministration/ticket/detail-ticket/detail-ticket.component";
import {EditTicketComponent} from "./components/appAdministration/ticket/edit-ticket/edit-ticket.component";
import {EditUserComponent} from "./components/appAdministration/user/edit-user/edit-user.component";
import {DetailUserComponent} from "./components/appAdministration/user/detail-user/detail-user.component";
import {CreateUserComponent} from "./components/appAdministration/user/create-user/create-user.component";
import {ListUserComponent} from "./components/appAdministration/user/list-user/list-user.component";

export const routes: Routes = [
  {path: '', title: 'CineVision', component: HomeComponent},

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

  {path: 'administration/genre', title: 'GenreAdministration', component: ListGenreComponent},
  {path: 'administration/genre/newGenre', title: 'CreateGenreAdministration', component: CreateGenreComponent},
  {path: 'administration/genre/:id', title: 'DetailsGenreAdministration', component: DetailGenreComponent},
  {path: 'administration/genre/replaceGenre/:id', title: 'ReplaceGenreAdministration', component: EditGenreComponent},

  {path: 'administration/ticket', title: 'TicketAdministration', component: ListTicketComponent},
  {path: 'administration/ticket/newTicket', title: 'CreateTicketAdministration', component: CreateTicketComponent},
  {path: 'administration/ticket/:id', title: 'DetailsTicketAdministration', component: DetailTicketComponent},
  {path: 'administration/ticket/replaceTicket/:id', title: 'ReplaceTicketAdministration', component: EditTicketComponent},

  {path: 'administration/user', title: 'UserAdministration', component: ListUserComponent},
  {path: 'administration/user/newUser', title: 'CreateUserAdministration', component: CreateUserComponent},
  {path: 'administration/user/:id', title: 'DetailsUserAdministration', component: DetailUserComponent},
  {path: 'administration/user/replaceUser/:id', title: 'ReplaceUserAdministration', component: EditUserComponent},

  {path: 'details/:id', title: 'Details film', component: DetailsFilmComponent},
  {path: 'movieTicket', title: 'Choose tickets', component: PurchaseComponent},
  {path: 'movieTicket/tickets', title: 'Tickets', component: ShowTicketComponent},

  {path: 'administration/user/auth/login', title: 'Login', component: LoginComponent},
  {path: 'administration/user/auth/signUp', title: 'SignUp', component: SignUpComponent},
];
