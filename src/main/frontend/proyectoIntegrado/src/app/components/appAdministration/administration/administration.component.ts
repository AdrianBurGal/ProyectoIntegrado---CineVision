import {Component, inject} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [],
  template: `
      <div id="administration">
          <div id="cont01">
              <div id="contIcon">
                  <i class="fa-solid fa-film"></i>
                  <p>CINEVISION</p>
              </div>
              <div id="contUser">
                  <h4 id="nameUser">{{ user?.firstname + " " + user?.lastname }}</h4>
                  <p id="emailUser">{{ user?.username }}</p>
                  <img src="../../../../../assets/userAdmin.webp" alt="photoUser">
              </div>
          </div>
          <div id="cont02">
              <h6>ADMINISTRATION</h6>
              <nav>
                  <ul>
                      <a href="/">
                          <li><i class="fa-solid fa-house"></i>Home</li>
                      </a>
                      <a href="/administration/films">
                          <li><i class="fa-solid fa-video"></i>Films</li>
                      </a>
                      <a href="/administration/actor">
                          <li><i class="fa-solid fa-people-group"></i>Actor</li>
                      </a>
                      <a href="/administration/director">
                          <li><i class="fa-solid fa-person"></i> Director</li>
                      </a>
                      <a href="/administration/schedule">
                          <li><i class="fa-regular fa-calendar"></i>Schedule</li>
                      </a>
                      <a href="/administration/genre">
                          <li><i class="fa-solid fa-compact-disc"></i>Genre</li>
                      </a>
                      <a href="/administration/ticket">
                          <li><i class="fa-solid fa-ticket"></i>Ticket</li>
                      </a>
                      <a href="/administration/user">
                          <li><i class="fa-solid fa-user"></i>User</li>
                      </a>
                  </ul>
              </nav>
          </div>
      </div>
  `,
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {
  loginService = inject(LoginService);
  user?: User;

  ngOnInit(): void {
    this.user = this.loginService.currentUserValue;
  }
}
