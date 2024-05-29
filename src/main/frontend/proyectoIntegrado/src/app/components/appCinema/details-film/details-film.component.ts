import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {Film} from "../../../models/Film";
import {FilmService} from "../../../services/film.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Schedule} from "../../../models/Schedule";
import {DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {Director} from "../../../models/Director";
import {Actor} from "../../../models/Actor";
import {Genre} from "../../../models/Genre";
import {PurchaseService} from "../../../services/purchase.service";
import {ScheduleService} from "../../../services/schedule.service";
import {Ticket} from "../../../models/Ticket";

@Component({
  selector: 'app-details-film',
  standalone: true,
  imports: [HeaderComponent, NgForOf, RouterLink, SlicePipe, DatePipe, NgIf],
  template: `
      <div id="background" [style.background-image]="'url(' + backgroundImageUrl + ')'"
           [style.background-size]="'cover'" [style.background-position]="'center top'">
          <app-header></app-header>

          <section id="contDetailFilm">
              <article id="contPhoto">
                  <img src="{{ film.photoUrl }}" alt="filmPhoto">
                  <div id="sinopsis" class="container">
                      <h1>About Movie</h1>
                      <hr>
                      <p>{{ film.sinopsis }}</p>
                  </div>
              </article>

              <article id="infoFilm">

                  <h1 class="title"> {{ (film.title).toUpperCase() }} </h1>
                  <p> {{ film.releaseDate | date:'MMM. dd, yyyy' }} </p>
                  <div [innerHTML]="calculateStars(film.score)" id="score"></div>
                  <p> {{ film.duration }} min </p>
                  <button><i class="fa-solid fa-play"></i> WATCH TRAILER</button>

                  <div id="details" class="container">
                      <h1>Movie Details</h1>
                      <hr>

                      <div id="contDirector">
                          <div id="director">Director</div>
                          <div id="nameDirector" class="container">
                            <span *ngFor="let director of directors">
                                {{ director.nameDirector }}
                            </span>
                          </div>
                      </div>

                      <div id="contActor">
                          <div id="actor">Actor</div>
                          <div id="namesActor" class="container">
                            <span *ngFor="let actor of actors">
                             {{ actor.nameActor }}
                            </span>
                          </div>
                      </div>

                      <div id="contActor">
                          <div id="genre">Genre</div>
                          <div id="nameGenre" class="container">
                            <span *ngFor="let genre of genres">
                             {{ genre.nameGenre }}
                            </span>
                          </div>
                      </div>
                  </div>
              </article>

              <article id="schedule" class="container">
                  <h1>See Schedules</h1>
                  <hr>
                  <div *ngFor="let schedule of schedules">
                      <button class="time" (click)="saveDetailsFilm(schedule.idSchedule)">
                          <i class="fa-regular fa-clock"></i>{{ schedule.time }}
                      </button>
                  </div>
              </article>

          </section>
      </div>
  `,
  styleUrl: './details-film.component.css'
})
export class DetailsFilmComponent implements OnInit {

  film!: Film;

  filmService = inject(FilmService);
  purchaseService = inject(PurchaseService);
  scheduleService = inject(ScheduleService);
  directors: Director[] = [];
  actors: Actor[] = [];
  schedules: Schedule[] = [];
  genres: Genre[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  backgroundImageUrl: String | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filmService.find(Number(this.route.snapshot.params['id']))
      .subscribe(film => {
        this.film = film;
        this.backgroundImageUrl = "./../../../../../../assets/back-" + this.film.title.replace(/\s/g, '') + ".webp";
        this.schedules = this.film.schedules;
        this.directors = this.film.directors;
        this.actors = this.film.actors;
        this.genres = this.film.genres;
      });
  }

  calculateStars(score: number | undefined) {
    if (score) {
      let fullStars = Math.floor(score / 2);
      let halfStar = score % 2 !== 0 ? '<i class="fa-solid fa-star-half"></i>' : '';
      return '<i class="fa-solid fa-star"></i>'.repeat(fullStars) + halfStar;
    }
    return '';
  }

  saveDetailsFilm(idSchedule: number) {
    this.scheduleService.find(idSchedule).subscribe(schedule => {
      this.purchaseService.setPurchase({film: this.film, time: schedule.time.toString(), total: 0, tickets: new Map<number, Ticket[]>()})
      this.router.navigate(['/movieTicket']);
    });
  }
}
