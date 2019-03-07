import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { SubjectsService } from "../subjects.service";
import { ISubject } from "../../../interfaces/subject";

@Component({
  selector: 'app-subjects-form',
  templateUrl: './subjects-form.component.html',
  styleUrls: ['./subjects-form.component.css']
})
export class SubjectsFormComponent implements OnInit {

  editState = false;

  subjectId: number;

  nameField: string;

  shortNameField: string;

  noteField: string;

  errorMessage: string;

  successMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if('id' in params) {
        this.subjectId = params['id'];
        this.fillForm();
        this.editState = true;
      }
    });
  }

  private fillForm() {
    this.subjectsService.getById(this.subjectId)
        .subscribe((data: ISubject) => {
          if(data) {

            this.nameField = data.name;
            this.shortNameField = data.shortName;
            this.noteField = data.note;

          } else this.errorMessage = 'Предмет не найден.';
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
    const newSubject: ISubject = {
      name: this.nameField,
      shortName: this.shortNameField,
      note: this.noteField
    };

    this.subjectsService.insert(newSubject)
        .subscribe(
            () => this.successMessage = 'Предмет успешно добавлен.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => { this.nameField = null; this.shortNameField = null; this.noteField = null; }
        );
  }

  private updateData() {
    const updatedSubject: ISubject = {
      id: this.subjectId,
      name: this.nameField,
      shortName: this.shortNameField,
      note: this.noteField
    };

    this.subjectsService.update(updatedSubject)
        .subscribe(
            () => this.successMessage = 'Предмет успешно обновлен.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

  confirm(message: string) {
    return confirm(message);
  }

  deleteData() {
    this.subjectsService.delete(this.subjectId)
        .subscribe(
            () => {
              this.successMessage = 'Предмет успешно удален.';
              this.router.navigate(['admin', 'subjects']);
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

}
