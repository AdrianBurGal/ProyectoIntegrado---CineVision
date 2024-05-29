import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [NgIf],
  template: `
    <header>
      <div id="infoUser">
        <img src="../../../../../assets/user.png" alt="photoUser">
        <div id="nameUser">
          <h6>Administrator</h6>
          <p>Adrian Burgos Galvez</p>
        </div>
        <i class="fa-regular fa-bell"></i>
      </div>
    </header>
  `,
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {

}
