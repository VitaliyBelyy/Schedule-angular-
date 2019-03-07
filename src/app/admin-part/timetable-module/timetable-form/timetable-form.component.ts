import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { TimetableService } from "../timetable.service";
import { AuditoriesService } from "../../auditories-module/auditories.service";
import { GroupsService } from "../../groups-module/groups.service";
import { TeachersService } from "../../teachers-module/teachers.service";
import { SubjectsService } from "../../subjects-module/subjects.service";
import { IAuditory } from "../../../interfaces/auditory";
import { IGroup } from "../../../interfaces/group";
import { ITeacher } from "../../../interfaces/teacher";
import { ISubject } from "../../../interfaces/subject";
import { ITimetableItem } from "../../../interfaces/timetable-item";

@Component({
  selector: 'app-timetable-form',
  templateUrl: './timetable-form.component.html',
  styleUrls: ['./timetable-form.component.css']
})
export class TimetableFormComponent implements OnInit {

  editState = false;

  itemId: number;

  lessonNumberField: number;

  lessonTypeField: string;

  weekDayField: number;

  weekTypeField: string;

  auditoryField: number;

  groupField: number;

  teacherField: number;

  subjectField: number;

  auditories: IAuditory[] = [];

  groups: IGroup[] = [];

  teachers: ITeacher[] = [];

  subjects: ISubject[] = [];

  errorMessage: string;

  successMessage: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private timetableService: TimetableService,
      private auditoriesService: AuditoriesService,
      private groupsService: GroupsService,
      private teachersService: TeachersService,
      private subjectsService: SubjectsService
  ) { }

  ngOnInit() {
    this.auditoriesService.getList()
        .subscribe((auditory: IAuditory[]) => this.auditories = auditory);

    this.groupsService.getList()
        .subscribe((group: IGroup[]) => this.groups = group);

    this.teachersService.getList()
        .subscribe((teacher: ITeacher[]) => this.teachers = teacher);

    this.subjectsService.getList()
        .subscribe((subject: ISubject[]) => this.subjects = subject);

    this.route.queryParams.subscribe((params: Params) => {
      if('id' in params) {
        this.itemId = params['id'];
        this.fillForm();
        this.editState = true;
      }
    });
  }

  private fillForm() {
    this.timetableService.getById(this.itemId)
        .subscribe((data: ITimetableItem) => {
          if(data) {

            this.lessonNumberField = data.lessonNumber;
            this.lessonTypeField = data.lessonType;
            this.weekDayField = data.weekDay;
            this.weekTypeField = data.weekType;
            this.auditoryField = data.auditoryID;
            this.groupField = data.groupID;
            this.teacherField = data.teacherID;
            this.subjectField = data.subjectID;

          } else this.errorMessage = 'Запись не найдена.';
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
    const newItem: ITimetableItem = {
      lessonNumber: this.lessonNumberField,
      lessonType: this.lessonTypeField,
      weekDay: this.weekDayField,
      weekType: this.weekTypeField,
      auditoryID: this.auditoryField,
      groupID: this.groupField,
      teacherID: this.teacherField,
      subjectID: this.subjectField
    };

    this.timetableService.insert(newItem)
        .subscribe(
            () => this.successMessage = 'Запись успешно добавлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); },
            () => {
              this.lessonNumberField = null;
              this.lessonTypeField = null;
              this.weekDayField = null;
              this.weekTypeField = null;
              this.auditoryField = null;
              this.groupField = null;
              this.teacherField = null;
              this.subjectField = null;
            }
        );
  }

  private updateData() {
    const updatedItem: ITimetableItem = {
      id: this.itemId,
      lessonNumber: this.lessonNumberField,
      lessonType: this.lessonTypeField,
      weekDay: this.weekDayField,
      weekType: this.weekTypeField,
      auditoryID: this.auditoryField,
      groupID: this.groupField,
      teacherID: this.teacherField,
      subjectID: this.subjectField
    };

    this.timetableService.update(updatedItem)
        .subscribe(
            () => this.successMessage = 'Запись успешно обновлена.',
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

  confirm(message: string) {
    return confirm(message);
  }

  deleteData() {
    this.timetableService.delete(this.itemId)
        .subscribe(
            () => {
              this.successMessage = 'Запись успешно удалена.';
              this.router.navigate(['admin', 'timetable']);
            },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        )
  }

}
