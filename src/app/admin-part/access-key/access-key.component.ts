import { Component, OnInit } from '@angular/core';

import { AccessKeyService } from "../access-key.service";

@Component({
  selector: 'app-access-key',
  templateUrl: './access-key.component.html',
  styleUrls: ['./access-key.component.css']
})
export class AccessKeyComponent implements OnInit {

  keyValue: number;

  errorMessage: string;

  successMessage: string;

  constructor(private keyService: AccessKeyService) { }

  ngOnInit() {
    this.keyService.getAccessKey()
        .subscribe((keyValue: number) => this.keyValue = keyValue);
  }

  setNewKey() {
    this.errorMessage = '';
    this.successMessage = '';

    this.keyService.setAccessKey(this.getRandomKey(1000000))
        .subscribe(
            (keyValue: number) => { this.keyValue = keyValue; this.successMessage = 'Ключ успешно изменен.'; },
            (error: any) => { this.errorMessage = 'Произошла ошибка, попробуйте снова.'; console.log(error); }
        );
  }

  private getRandomKey(maxValue: number) {
    return Math.round( Math.random() * maxValue );
  }

}
