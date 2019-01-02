import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { Router } from '@angular/router';
import { StuffManagerService } from '../services/stuff-manager.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private _logger: LoggerService,
    private _stuffManager: StuffManagerService,
    private _router: Router
  ) {
    this._logger.logout();
    this._router.navigate(['home']);
    this._stuffManager.showAlert('Bye bye', null, null, ['Bye']);
  }

  ngOnInit() {
  }

}
