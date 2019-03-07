import { Component, OnInit } from '@angular/core';

import { ICathedra } from "../../../interfaces/cathedra";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { GroupsService } from "../groups.service";
import { CathedrasService } from "../../cathedras-module/cathedras.service";
import { IGroup } from "../../../interfaces/group";

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent implements OnInit {

  editState = false;

  groupId: number;

  nameField: string;

  courseField: number;

  admissionYearField: number;

  graduatingYearField: number;

  cathedraField: number;

  cathedras: ICathedra[] = [];

  errorMessage: string;

  successMessage: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private groupsService: GroupsService,
      private cathedrasService: CathedrasService
  ) { }

  ngOnInit() {
    this.cathedrasService.getList()
        .subscribe((cathedras: ICathedra[]) => this.cathedras = cathedras);

    this.route.queryParams.subscribe((params: Params) => {
      if('id' in params) {
        this.groupId = params['id'];
        this.fillForm();
        this.editState = true;
      }
    });
  }

  private fillForm() {
    this.groupsService.getById(this.groupId)
        .subscribe((data: IGroup) => {
          if(data) {

            this.nameField = data.nameGroup;
            this.courseField = data.course;
            this.admissionYearField = data.admissionYear;
            this.graduatingYearField = data.graduatingYear;
            this.cathedraField = data.cathedraID;

          } else this.errorMessage = 'Группа не найдена.';
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
    const newGroup: IGroup = {
      nameGroup: this.nameField,
      course: this.courseField,
      admissionYear: this.admissionYearField,
      graduatingYear: this.graduatingYearField,
      cathedraID: this.cathedraField
    };

    this.groupsService.insert(newGroup)
        .subscribe(
            () => this.successMessage = 'Группа успешно добавлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => {
              this.nameField = null;
              this.courseField = null;
              this.admissionYearField = null;
              this.graduatingYearField = null;
              this.cathedraField = null;
            }
        );
  }

  private updateData() {
    const updatedGroup: IGroup = {
      id: this.groupId,
      nameGroup: this.nameField,
      course: this.courseField,
      admissionYear: this.admissionYearField,
      graduatingYear: this.graduatingYearField,
      cathedraID: this.cathedraField
    };

    this.groupsService.update(updatedGroup)
        .subscribe(
            () => this.successMessage = 'Группа успешно обновлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

  confirm(message: string) {
    return confirm(message);
  }

  deleteData() {
    this.groupsService.delete(this.groupId)
        .subscribe(
            () => {
              this.successMessage = 'Группа успешно удалена.';
              this.router.navigate(['admin', 'groups']);
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

}
