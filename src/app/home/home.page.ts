import { Component } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { AlertController } from '@ionic/angular';
import { StuffManagerService } from '../services/stuff-manager.service';
import { Router } from '@angular/router';

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
  public id: string;

  constructor(
    private _restapi: RestapiService,
    private _stuffManager: StuffManagerService,
    private _router: Router
  ) {
    this._restapi.getGlobal('/games/find-all', '').subscribe(data => {
      let mdata: any = data;
      mdata = mdata.msg;
      let r = Math.floor(Math.random() * mdata.length);
      for (let i = 0; i < mdata.length; i++) {
        if (i === r) {
          this.id = mdata[i]._id;
          this.name = mdata[i].name;
          this.image = '../../assets/images/' + mdata[i].img + '.png';
          this.rating = mdata[i].rating;
          let date = (mdata[i].released + '').split('T')[0].split('-');
          let year = parseInt(date[0]);
          let month = parseInt(date[1]);
          let day = parseInt(date[2]);
          this.release = new Date(year, month - 1, day);
          this.description = mdata[i].description;
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
          break;
        }
      }
    }, err => {
      let e: any = err;
      e = e.error.msg.errmsg;
      this._stuffManager.showAlert('Error', null, e);
    });
  }

  public goToGame(): void {
    this._stuffManager.setRoutedGame(this.id);
    this._router.navigate(['search']);
  }
}
