import { Component, OnInit, Input } from '@angular/core';

import { AuditoriesService } from "../admin-part/auditories-module/auditories.service";
import { GroupsService } from "../admin-part/groups-module/groups.service";
import { TeachersService } from "../admin-part/teachers-module/teachers.service";
import { SubjectsService } from "../admin-part/subjects-module/subjects.service";
import { IAuditory } from "../interfaces/auditory";
import { ISubject } from "../interfaces/subject";
import { ITeacher } from "../interfaces/teacher";
import { IGroup } from "../interfaces/group";
import { IDailySchedule } from "../interfaces/daily-schedule";

interface ISupportingInfo {
  weekDays: Object;
  auditories: Object;
  groups: Object;
  teachers: Object;
  subjects: Object;
}

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {

  @Input() data: IDailySchedule[];

  supportingInfo: ISupportingInfo = {
    weekDays: {
      "1": "Понедельник",
      "2": "Вторник",
      "3": "Среда",
      "4": "Четверг",
      "5": "Пятница",
      "6": "Суббота",
      "7": "Воскресенье"
    },
    auditories: {},
    groups: {},
    teachers: {},
    subjects: {}
  };

  constructor(
      private auditoriesService: AuditoriesService,
      private groupsService: GroupsService,
      private teachersService: TeachersService,
      private subjectsService: SubjectsService
  ) { }

  ngOnInit() {
    this.auditoriesService.getList()
        .subscribe(
            (auditories: IAuditory[]) => {
              for(let auditory of auditories) {
                this.supportingInfo.auditories[auditory.id] = auditory.number;
              }
            }
        );

    this.groupsService.getList()
        .subscribe(
            (groups: IGroup[]) => {
              for(let group of groups) {
                this.supportingInfo.groups[group.id] = group.nameGroup;
              }
            }
        );

    this.teachersService.getList()
        .subscribe(
            (teachers: ITeacher[]) => {
              for(let teacher of teachers) {
                this.supportingInfo.teachers[teacher.id] = teacher.fullName;
              }
            }
        );

    this.subjectsService.getList()
        .subscribe(
            (subjects: ISubject[]) => {
              for(let subject of subjects) {
                this.supportingInfo.subjects[subject.id] = subject.name;
              }
            }
        );
  }

}
