import {Component, inject} from '@angular/core';
import {AdministrationComponent} from "../../administration/administration.component";
import {HeaderAdminComponent} from "../../header-admin/header-admin.component";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Director} from "../../../../models/Director";
import {DirectorService} from "../../../../services/director.service";

@Component({
  selector: 'app-list-director',
  standalone: true,
  imports: [AdministrationComponent, HeaderAdminComponent, NgForOf, NgIf, RouterLink],
  template: `
    <div id="mainAdmin">
      <app-administration/>
      <div id="contTableAdmin">
        <app-header-admin/>
        <div id="container01">
          <h1>Directors</h1>
          <button class="create-button" [routerLink]="['/administration/director/newDirector']"><i
            class="fa-solid fa-plus"></i></button>
        </div>
        <table class="custom-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Director</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody id="tbody">
          <!-- Aquí irían los datos de la tabla -->
          <tr *ngFor="let director of directorFilter ">
            <td>{{ director.idDirector }}</td>
            <td>{{ director.nameDirector }}</td>
            <td>
              <button class="show-button"
                      [routerLink]="['/administration/director/' + director.idDirector]">
                <i class="fa-solid fa-eye"></i></button>
              <button class="edit-button"
                      [routerLink]="['/administration/director/replaceDirector/' + director.idDirector]">
                <i class="fa-solid fa-pen-to-square"></i></button>
              <button class="delete-button" (click)="deleteDirector(director.idDirector)">
                <i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          </tbody>
        </table>
        <div *ngIf="directorFilter.length === 0" class="alert">
          There are no directors with this search criteria.
        </div>
      </div>
    </div>
  `,
  styleUrl: './list-director.component.css'
})
export class ListDirectorComponent {

  directors: Director[] = [];
  directorService = inject(DirectorService);
  directorFilter: Director[] = [];
  filter: string = '';

  ngOnInit(): void {
    this.directorService.getAll().subscribe((data: Director[]) => {
      this.directors = data;
      this.directorFilter = this.directors;
      console.log(this.directors);
    })
  }

  deleteDirector(id: any) {
    this.directorService.delete(id).subscribe(res => {
      this.directorFilter = this.directors.filter(director => director.idDirector !== id);
      console.log('Director id =' + id + ' delete satisfactory!');
    })
  }

  filterDirectorByName(): void {
    console.log(this.filter)
    if (this.filter === '') {
      this.directorFilter = this.directors;
    } else {
      this.directorFilter = this.directors.filter(director => {
        return director.nameDirector.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }

}
