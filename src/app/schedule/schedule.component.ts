import { Component, OnInit } from '@angular/core';

import { TimetableService } from "../admin-part/timetable-module/timetable.service";
import { IFilterOptions } from "../interfaces/filter-options";
import { ITimetableItem } from "../interfaces/timetable-item";
import { IDailySchedule } from "../interfaces/daily-schedule";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  weekSchedule: IDailySchedule[] = [];

  constructor(private timetableService: TimetableService) { }

  ngOnInit() { }

  loadData(options: IFilterOptions) {
    this.timetableService.getFilteredList(options)
        .subscribe((items: ITimetableItem[]) => this.weekSchedule = (items.length) ? this.splitByWeekDays(items) : []);
  }

  private splitByWeekDays(items: ITimetableItem[]): IDailySchedule[] {
    let results: IDailySchedule[] = [];
    let firstObject: IDailySchedule = {
      "weekDay": items[0]["weekDay"],
      "timetableItems": []
    };

    let lastObject = items.reduce((object, item) => {
      if(item["weekDay"] == object["weekDay"]) {

        object["timetableItems"].push(item);
        return object;

      } else {

        let newObject = {
          "weekDay": item["weekDay"],
          "timetableItems": [item]
        };
        results.push(object);
        return newObject;

      }

    }, firstObject);
    results.push(lastObject);

    return results;
  }

}
