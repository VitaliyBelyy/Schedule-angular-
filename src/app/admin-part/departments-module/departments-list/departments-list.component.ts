import { Component, OnInit } from '@angular/core';

import { IDepartment } from "../../../interfaces/department";
import { DepartmentsService } from "../departments.service";

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  departments: IDepartment[] = [];

  totalRows = 0;

  constructor(private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.departmentsService.getList()
        .subscribe(
            (departments: IDepartment[]) => {
              this.departments = departments;
              this.totalRows = departments.length;
            }
        );
  }

}
