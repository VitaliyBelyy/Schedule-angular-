import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

import { AuditoriesService } from "../auditories.service";
import { IAuditory } from "../../../interfaces/auditory";

@Component({
  selector: 'app-auditories-form',
  templateUrl: './auditories-form.component.html',
  styleUrls: ['./auditories-form.component.css']
})
export class AuditoriesFormComponent implements OnInit {

  editState = false;

  auditoryId: number;

  numberField: string;

  typeField: string;

  errorMessage: string;

  successMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private auditoriesService: AuditoriesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if('id' in params) {
        this.auditoryId = params['id'];
        this.fillForm();
        this.editState = true;
      }
    });
  }

  private fillForm() {
    this.auditoriesService.getById(this.auditoryId)
        .subscribe((data: IAuditory) => {
          if(data) {

            this.numberField = data.number;
            this.typeField = data.type;

          } else this.errorMessage = 'Аудитория не найдена.';
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
    const newAuditory: IAuditory = {
      number: this.numberField,
      type: this.typeField
    };

    this.auditoriesService.insert(newAuditory)
        .subscribe(
            () => this.successMessage = 'Аудитория успешно добавлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => { this.numberField = null; this.typeField = null; }
        );
  }

  private updateData() {
    const updatedAuditory: IAuditory = {
      id: this.auditoryId,
      number: this.numberField,
      type: this.typeField
    };

    this.auditoriesService.update(updatedAuditory)
        .subscribe(
            () => this.successMessage = 'Аудитория успешно обновлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

  confirm(message: string) {
    return confirm(message);
  }

  deleteData() {
    this.auditoriesService.delete(this.auditoryId)
        .subscribe(
            () => {
              this.successMessage = 'Аудитория успешно удалена.';
              this.router.navigate(['admin', 'auditories']);
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

}
