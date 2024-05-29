import { Component } from '@angular/core';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [],
  template: `
      <div id="administration">
          <div id="cont01">
              <div id="contIcon">
                  <i class="fa-solid fa-film"></i>
                  <p>CINE</p>
              </div>
              <div id="contUser">
                  <h4 id="nameUser">Adrian Burgos Galvez</h4>
                  <p id="emailUser">adrianburgosgalvezgmail.com</p>
                  <img src="../../../../../assets/user.png" alt="photoUser">
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
                      <a href="administration/schedule">
                          <li><i class="fa-regular fa-calendar"></i>Schedule</li>
                      </a>
                      <a href="/administration/genre">
                          <li><i class="fa-solid fa-compact-disc"></i>Genre</li>
                      </a>
                  </ul>
              </nav>
          </div>
      </div>
  `,
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {

}
