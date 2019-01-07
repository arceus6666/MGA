import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StuffManagerService } from './services/stuff-manager.service';
import { LoggerService } from './services/logger.service';
import { RestapiService } from './services/restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _stuffManager: StuffManagerService,
    private _logger: LoggerService,
    private _restapi: RestapiService
  ) {
    this.appPages = this._stuffManager.getPages();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    let tk = this._stuffManager.getItem('token');
    // console.log(tk)
    if (tk) {
      this._restapi.getGlobal('/auth', null, tk).subscribe(data => {
        // console.log(data)
        let mdata: any = data;
        mdata = mdata.msg;
        this._logger.login(mdata, tk);
      }, err => {
        console.log(err)
      })
    }
  }

}
