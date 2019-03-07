import { Component, OnInit } from '@angular/core';

import { ICathedra } from "../../../interfaces/cathedra";
import { CathedrasService } from "../cathedras.service";
import {IDepartment} from "../../../interfaces/department";
import { DepartmentsService } from "../../departments-module/departments.service";

interface IResults {
    cathedras: ICathedra[];
    departments: Object
}

@Component({
  selector: 'app-cathedras-list',
  templateUrl: 'cathedras-list.component.html',
  styleUrls: ['cathedras-list.component.css']
})
export class CathedrasListComponent implements OnInit {

  results: IResults = {
    cathedras: [],
    departments: {}
  };

  totalRows = 0;

  constructor(private cathedrasService: CathedrasService, private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.cathedrasService.getList()
        .subscribe(
            (cathedras: ICathedra[]) => {
              this.results.cathedras = cathedras;
              this.totalRows = cathedras.length;
            }
        );

    this.departmentsService.getList()
        .subscribe(
            (departments: IDepartment[]) => {
              for(let department of departments) {
                this.results.departments[department.id] = department.name;
              }
            }
        );
  }

}
