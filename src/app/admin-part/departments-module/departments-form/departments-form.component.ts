import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { DepartmentsService } from "../departments.service";
import { IDepartment } from "../../../interfaces/department";

@Component({
  selector: 'app-departments-form',
  templateUrl: './departments-form.component.html',
  styleUrls: ['./departments-form.component.css']
})
export class DepartmentsFormComponent implements OnInit {

  editState = false;

  departmentId: number;

  nameField: string;

  errorMessage: string;

  successMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if('id' in params) {
        this.departmentId = params['id'];
        this.fillForm();
        this.editState = true;
      }
    });
  }

  private fillForm() {
    this.departmentsService.getById(this.departmentId)
        .subscribe((data: IDepartment) => {
          if(data) {

            this.nameField = data.name;

          } else this.errorMessage = 'Факультет не найден.';
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
    const newDepartment: IDepartment = {
      name: this.nameField
    };

    this.departmentsService.insert(newDepartment)
        .subscribe(
            () => this.successMessage = 'Факультет успешно добавлен.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => this.nameField = null
        );
  }

  private updateData() {
    const updatedDepartment: IDepartment = {
      id: this.departmentId,
      name: this.nameField
    };

    this.departmentsService.update(updatedDepartment)
        .subscribe(
            () => this.successMessage = 'Факультет успешно обновлен.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

  confirm(message: string) {
    return confirm(message);
  }

  deleteData() {
    this.departmentsService.delete(this.departmentId)
        .subscribe(
            () => {
              this.successMessage = 'Факультет успешно удален.';
              this.router.navigate(['admin', 'departments']);
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

}
