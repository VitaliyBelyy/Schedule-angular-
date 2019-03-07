import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { CathedrasService } from "../cathedras.service";
import { DepartmentsService } from "../../departments-module/departments.service";
import { IDepartment } from "../../../interfaces/department";
import { ICathedra } from "../../../interfaces/cathedra";

@Component({
  selector: 'app-cathedras-form',
  templateUrl: 'cathedras-form.component.html',
  styleUrls: ['cathedras-form.component.css']
})
export class CathedrasFormComponent implements OnInit {

  editState = false;

  cathedraId: number;

  nameField: string;

  departmentField: number;

  departments: IDepartment[] = [];

  errorMessage: string;

  successMessage: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private cathedrasService: CathedrasService,
      private departmentsService: DepartmentsService
  ) { }

  ngOnInit() {
    this.departmentsService.getList()
        .subscribe((departments: IDepartment[]) => this.departments = departments);

    this.route.queryParams.subscribe((params: Params) => {
      if('id' in params) {
        this.cathedraId = params['id'];
        this.fillForm();
        this.editState = true;
      }
    });
  }

  private fillForm() {
    this.cathedrasService.getById(this.cathedraId)
        .subscribe((data: ICathedra) => {
          if(data) {

            this.nameField = data.name;
            this.departmentField = data.departmentID;

          } else this.errorMessage = 'Кафедра не найдена.';
        })
  }

  submitForm() {
    this.errorMessage = '';
    this.successMessage = '';

    if(this.editState) {

      this.updateData();

    } else {

      this.addData();

    }
  }

  private addData() {
    const newCathedra: ICathedra = {
      name: this.nameField,
      departmentID: this.departmentField
    };

    this.cathedrasService.insert(newCathedra)
        .subscribe(
            () => this.successMessage = 'Кафедра успешно добавлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => { this.nameField = null; this.departmentField = null; }
        );
  }

  private updateData() {
    const updatedCathedra: ICathedra = {
      id: this.cathedraId,
      name: this.nameField,
      departmentID: this.departmentField
    };

    this.cathedrasService.update(updatedCathedra)
        .subscribe(
            () => this.successMessage = 'Кафедра успешно обновлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

  confirm(message: string) {
    return confirm(message);
  }

  deleteData() {
    this.cathedrasService.delete(this.cathedraId)
        .subscribe(
            () => {
              this.successMessage = 'Кафедра успешно удалена.';
              this.router.navigate(['admin', 'cathedras']);
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

}
