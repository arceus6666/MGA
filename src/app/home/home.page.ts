import { Component } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { AlertController } from '@ionic/angular';
import { StuffManagerService } from '../services/stuff-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public image: string;
  public name: string;
  public rating: number;
  public stars = [];
  public release: Date;
  public description: string;

  private names: Array<string> = [
    'Batman: Return to Arkham',
    'TEKKEN 7',
    'Valkyria Chronicles Remastered',
    'Heavy Rain',
    'Marvel vs. Capcom: Infinite'
  ];

  constructor(
    private _restapi: RestapiService,
    private _stuffManager: StuffManagerService
  ) {
    let r = Math.floor(Math.random() * this.names.length);
    for (let i = 0; i < this.names.length; i++) {
      if (i === r) {
        this.name = this.names[i];
      }
    }
    this._restapi.getGlobal('/games/find-name', this.name).subscribe(data => {
      let mdata: any = data;
      mdata = mdata.msg;
      this.image = '../../assets/images/' + mdata.img + '.png';
      this.rating = mdata.rating;
      let date = (mdata.released + '').split('T')[0].split('-');
      let year = parseInt(date[0]);
      let month = parseInt(date[1]);
      let day = parseInt(date[2]);
      this.release = new Date(year, month - 1, day);
      this.description = mdata.description;
      let ns = [Math.floor(this.rating), this.rating % 1];
      for (let i = 0; i < 5; i++) {
        if (ns[0] > i) {
          this.stars.push('../../assets/images/star.png');
        } else {
          this.stars.push('../../assets/images/star-empty.png');
        }
      }
      if (ns[0] < 5) {
        if (ns[1] > 0) {
          this.stars[ns[0]] = ('../../assets/images/star-half.png');
        } else {
          this.stars[4] = ('../../assets/images/star-empty.png');
        }
      }
    }, err => {
      let e: any = err;
      e = e.error.msg.errmsg;
      this._stuffManager.showAlert('Game not found', null, e);
    })
  }

  public addImageName(name): void {
    this.names.push(name);
  }

}
