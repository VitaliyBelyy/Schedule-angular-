import { Component, OnInit } from '@angular/core';

import { AuditoriesService } from "../auditories.service";
import { IAuditory } from "../../../interfaces/auditory";

@Component({
  selector: 'app-auditories-list',
  templateUrl: 'auditories-list.component.html',
  styleUrls: ['auditories-list.component.css']
})
export class AuditoriesListComponent implements OnInit {

  auditories: IAuditory[] = [];

  totalRows = 0;

  constructor(private auditoriesService: AuditoriesService) { }

  ngOnInit() {
    this.auditoriesService.getList()
        .subscribe(
            (auditories: IAuditory[]) => {
              this.auditories = auditories;
              this.totalRows = auditories.length;
            }
        );
  }

}
