import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { StuffManagerService } from '../services/stuff-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public un: string;
  public fn: string;
  public ln: string;
  public mail: string;
  public pass: string;

  constructor(
    private _restapi: RestapiService,
    private _stuffManager: StuffManagerService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  public signup(): void {
    let user = {
      username: this.un,
      fullname: {
        firstname: this.fn,
        lastname: this.ln
      },
      email: this.mail,
      password: this.pass
    };
    this._restapi.postGlobal('/users/register', user).subscribe(data => {
      this._stuffManager.showAlert('Signed up correctly');
      this._router.navigate(['Login']);
    }, err => {
      let e: any = err;
      e = e.error.msg.errmsg;
      if (e) {
        if (e.split(' ')[0] === 'E11000') {
          this._stuffManager.showAlert('ERROR !', 'Username already exists.', 'Please choose a different username.');
        } else {
          //console.log(err)
          this._stuffManager.showAlert('ERROR !', null, e)
        }
      } else {
        //console.log(err)
        this._stuffManager.showAlert('ERROR !', null, e)
      }
    })
  }

}
