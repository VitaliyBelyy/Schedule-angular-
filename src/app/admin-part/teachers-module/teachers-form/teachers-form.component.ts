import { Component, OnInit } from '@angular/core';

import { ICathedra } from "../../../interfaces/cathedra";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { CathedrasService } from "../../cathedras-module/cathedras.service";
import { TeachersService } from "../teachers.service";
import { ITeacher } from "../../../interfaces/teacher";

@Component({
  selector: 'app-teachers-form',
  templateUrl: './teachers-form.component.html',
  styleUrls: ['./teachers-form.component.css']
})
export class TeachersFormComponent implements OnInit {

  editState = false;

  teacherId: number;

  nameField: string;

  titleField: string;

  cathedraField: number;

  cathedras: ICathedra[] = [];

  errorMessage: string;

  successMessage: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private teachersService: TeachersService,
      private cathedrasService: CathedrasService
  ) { }

  ngOnInit() {
    this.cathedrasService.getList()
        .subscribe((cathedras: ICathedra[]) => this.cathedras = cathedras);

    this.route.queryParams.subscribe((params: Params) => {
      if('id' in params) {
        this.teacherId = params['id'];
        this.fillForm();
        this.editState = true;
      }
    });
  }

  private fillForm() {
    this.teachersService.getById(this.teacherId)
        .subscribe((data: ITeacher) => {
          if(data) {

            this.nameField = data.fullName;
            this.titleField = data.title;
            this.cathedraField = data.cathedraID;

          } else this.errorMessage = 'Преподаватель не найден.';
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
    const newTeacher: ITeacher = {
      fullName: this.nameField,
      title: this.titleField,
      cathedraID: this.cathedraField
    };

    this.teachersService.insert(newTeacher)
        .subscribe(
            () => this.successMessage = 'Преподаватель успешно добавлен.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => { this.nameField = null; this.titleField = null; this.cathedraField = null; }
        );
  }

  private updateData() {
    const updatedTeacher: ITeacher = {
      id: this.teacherId,
      fullName: this.nameField,
      title: this.titleField,
      cathedraID: this.cathedraField
    };

    this.teachersService.update(updatedTeacher)
        .subscribe(
            () => this.successMessage = 'Преподаватель успешно обновлен.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

  confirm(message: string) {
    return confirm(message);
  }

  deleteData() {
    this.teachersService.delete(this.teacherId)
        .subscribe(
            () => {
              this.successMessage = 'Преподаватель успешно удален.';
              this.router.navigate(['admin', 'teachers']);
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

}
