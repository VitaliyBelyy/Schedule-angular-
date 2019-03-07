import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { IDepartment } from "../interfaces/department";
import { ICathedra } from "../interfaces/cathedra";
import { IGroup } from "../interfaces/group";
import { ITeacher } from "../interfaces/teacher";
import { DepartmentsService } from "../admin-part/departments-module/departments.service";
import { CathedrasService } from "../admin-part/cathedras-module/cathedras.service";
import { GroupsService } from "../admin-part/groups-module/groups.service";
import { TeachersService } from "../admin-part/teachers-module/teachers.service";
import { IFilterOptions } from "../interfaces/filter-options";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() type: string;

  departmentField: number = 0;

  cathedraField: number = 0;

  groupField: number = 0;

  teacherField: number = 0;

  weekTypeField: string = '';

  departments: IDepartment[] = [];

  cathedras: ICathedra[] = [];

  groups: IGroup[] = [];

  teachers: ITeacher[] = [];

  @Output() onOptionsSelected: EventEmitter<IFilterOptions> = new EventEmitter<IFilterOptions>();

  constructor(
      private departmentsService: DepartmentsService,
      private cathedrasService: CathedrasService,
      private groupsService: GroupsService,
      private teachersService: TeachersService
  ) { }

  ngOnInit() {
    this.departmentsService.getList()
        .subscribe((departments: IDepartment[]) => this.departments = departments);
  }

  loadCathedras() {
    this.cathedraField = 0;
    this.cathedras = [];
    this.groupField = 0;
    this.groups = [];
    this.teacherField = 0;
    this.teachers = [];

    this.cathedrasService.getByDepartment(this.departmentField)
        .subscribe((cathedras: ICathedra[]) => this.cathedras = cathedras);
  }

  loadGroups() {
    this.groupField = 0;
    this.groups = [];

    this.groupsService.getByCathedra(this.cathedraField)
        .subscribe((groups: IGroup[]) => this.groups = groups);
  }

  loadTeachers() {
    this.teacherField = 0;
    this.teachers = [];

    this.teachersService.getByCathedra(this.cathedraField)
        .subscribe((teachers: ITeacher[]) => this.teachers = teachers);
  }

  onSearch() {
    let filterOptions: IFilterOptions;

    if(this.type == 'default') {
      if(this.weekTypeField && this.groupField) {
        filterOptions = {
          groupID: this.groupField,
          weekType: this.weekTypeField
        };
      } else alert('Заполните все поля!');
    }
    else if(this.type == 'for-teachers') {
      if(this.weekTypeField && this.teacherField) {
        filterOptions = {
          teacherID: this.teacherField,
          weekType: this.weekTypeField
        };
      } else alert('Заполните все поля!');
    }

    if(filterOptions) this.onOptionsSelected.emit(filterOptions);
  }

}
