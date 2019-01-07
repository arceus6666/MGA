import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { RestapiService } from '../services/restapi.service';
import { StuffManagerService } from '../services/stuff-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public un: string;
  public pass: string;
  public cbchecked: boolean;
  constructor(
    private _logger: LoggerService,
    private _restapi: RestapiService,
    private _stuffManager: StuffManagerService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this._restapi.getGlobal('/users/login', this.un + '-' + this.pass).subscribe(data => {
      let mdata: any = data;
      this._logger.login(mdata.msg._id, mdata.token);
      if (this.cbchecked) {
        this._stuffManager.storeItem('token', mdata.token);
      }
      this._router.navigate(['home']);
      this._stuffManager.showAlert('Welcome');
    }, err => {
      let e: any = err;
      e = e.error.msg.errmsg;
      this._stuffManager.showAlert('Error', null, e);
    });
  }

  signup() {
    this._router.navigate(['signup'])
  }

}
