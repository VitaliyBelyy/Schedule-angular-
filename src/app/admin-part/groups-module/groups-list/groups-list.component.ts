import { Component, OnInit } from '@angular/core';

import { IGroup } from "../../../interfaces/group";
import { GroupsService } from "../groups.service";
import { CathedrasService } from "../../cathedras-module/cathedras.service";
import { ICathedra } from "../../../interfaces/cathedra";

interface IResults {
    groups: IGroup[];
    cathedras: Object;
}

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  results: IResults = {
    groups: [],
    cathedras: {}
  };

  totalRows = 0;

  constructor(private groupsService: GroupsService, private cathedrasService: CathedrasService) { }

  ngOnInit() {
    this.groupsService.getList()
        .subscribe(
            (groups: IGroup[]) => {
              this.results.groups = groups;
              this.totalRows = groups.length;
            }
        );

    this.cathedrasService.getList()
        .subscribe(
            (cathedras: ICathedra[]) => {
              for(let cathedra of cathedras) {
                this.results.cathedras[cathedra.id] = cathedra.name;
              }
            }
        );
  }

}
