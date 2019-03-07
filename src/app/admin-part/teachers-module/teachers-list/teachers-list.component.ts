import { Component, OnInit } from '@angular/core';

import { ITeacher } from "../../../interfaces/teacher";
import { ICathedra } from "../../../interfaces/cathedra";
import { TeachersService } from "../teachers.service";
import { CathedrasService } from "../../cathedras-module/cathedras.service";

interface IResults {
    teachers: ITeacher[];
    cathedras: Object
}

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  results: IResults = {
    teachers: [],
    cathedras: {}
  };

  totalRows = 0;

  constructor(private teachersService: TeachersService, private cathedrasService: CathedrasService) { }

  ngOnInit() {
    this.teachersService.getList()
        .subscribe(
            (teachers: ITeacher[]) => {
              this.results.teachers = teachers;
              this.totalRows = teachers.length;
            }
        );

    this.cathedrasService.getList()
        .subscribe(
            (cathedras: ICathedra[]) => {
              for(let cathedra of cathedras) {
                this.results.cathedras[cathedra.id] = cathedra.name;
              }
            }
        );
  }

}
