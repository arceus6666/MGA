import { Component, OnInit } from '@angular/core';
import { StuffManagerService } from '../services/stuff-manager.service';
import { LoggerService } from '../services/logger.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public logged: boolean;
  public user;
  constructor(
    private _stuffManager: StuffManagerService,
    private _logger: LoggerService,
    private _restapi: RestapiService
  ) {
    this.logged = _logger.isLogged();
    this.user = {};
    this.getInfo();
  }

  ngOnInit() {
  }

  public getInfo(): void {
    if (this.logged) {
      this._restapi.getGlobal('/users/find/' + this._logger.getId(), '').subscribe(data => {
        let mdata: any = data;
        mdata = mdata.msg;
        this.user.username = mdata.username;
        this.user.fullname = mdata.fullname;
        this.user.email = mdata.email;
        this.user.signupDate = mdata.signupDate;
      }, err => {
        let e: any = err;
        e = e.error.msg.errmsg;
        this._stuffManager.showAlert('Error', null, e);
      })
    } else {
      this._stuffManager.showAlert('Please login');
    }
  }

  public takePicture(): void {

  }
}
