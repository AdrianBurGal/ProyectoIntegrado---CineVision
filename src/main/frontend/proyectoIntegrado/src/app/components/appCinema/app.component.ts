import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {DetailsFilmComponent} from "./details-film/details-film.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, DetailsFilmComponent],
  template: '<router-outlet/>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoIntegrado';
}
