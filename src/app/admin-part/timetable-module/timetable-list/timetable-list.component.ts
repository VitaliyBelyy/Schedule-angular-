import { Component, OnInit } from '@angular/core';

import { ITimetableItem } from "../../../interfaces/timetable-item";
import {TimetableService} from "../timetable.service";
import {AuditoriesService} from "../../auditories-module/auditories.service";
import {GroupsService} from "../../groups-module/groups.service";
import {TeachersService} from "../../teachers-module/teachers.service";
import {SubjectsService} from "../../subjects-module/subjects.service";
import {IAuditory} from "../../../interfaces/auditory";
import {IGroup} from "../../../interfaces/group";
import {ITeacher} from "../../../interfaces/teacher";
import {ISubject} from "../../../interfaces/subject";

interface IResults {
    timetable: ITimetableItem[];
    weekDays: Object;
    auditories: Object;
    groups: Object;
    teachers: Object;
    subjects: Object;
}

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {

  results: IResults = {
    timetable: [],
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

  totalRows = 0;

  constructor(
      private timetableService: TimetableService,
      private auditoriesService: AuditoriesService,
      private groupsService: GroupsService,
      private teachersService: TeachersService,
      private subjectsService: SubjectsService
  ) { }

  ngOnInit() {
    this.timetableService.getList()
        .subscribe(
            (items: ITimetableItem[]) => {
              this.results.timetable = items;
              this.totalRows = items.length;
            }
        );

    this.auditoriesService.getList()
        .subscribe(
            (auditories: IAuditory[]) => {
              for(let auditory of auditories) {
                this.results.auditories[auditory.id] = auditory.number;
              }
            }
        );

    this.groupsService.getList()
        .subscribe(
            (groups: IGroup[]) => {
              for(let group of groups) {
                this.results.groups[group.id] = group.nameGroup;
              }
            }
        );

    this.teachersService.getList()
        .subscribe(
            (teachers: ITeacher[]) => {
              for(let teacher of teachers) {
                this.results.teachers[teacher.id] = teacher.fullName;
              }
            }
        );

    this.subjectsService.getList()
        .subscribe(
            (subjects: ISubject[]) => {
              for(let subject of subjects) {
                this.results.subjects[subject.id] = subject.name;
              }
            }
        );
  }

}
