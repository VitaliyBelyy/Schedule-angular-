import { Component, OnInit } from '@angular/core';
import {ISubject} from "../../../interfaces/subject";
import {SubjectsService} from "../subjects.service";

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent implements OnInit {

  subjects: ISubject[] = [];

  totalRows = 0;

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.subjectsService.getList()
        .subscribe(
            (subjects: ISubject[]) => {
              this.subjects = subjects;
              this.totalRows = subjects.length;
            }
        );
  }

}
