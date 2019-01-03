import { Injectable } from '@angular/core';
import { StuffManagerService } from './stuff-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logged: boolean;
  private _id: string;
  private token: string;

  constructor(private _stuffManager: StuffManagerService) {
    this.logged = false;
    this._id = null;
  }

  public isLogged(): boolean {
    return this.logged;
  }

  public getId(): string {
    return this._id;
  }

  public getToken(): string {
    return this.token;
  }

  public login(id,tk): void {
    this.logged = true;
    this._id = id;
    this.token = tk;
    this._stuffManager.setPages([
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Search',
        url: '/search',
        icon: 'search'
      },
      {
        title: 'Profile',
        url: '/profile',
        icon: 'person'
      },
      {
        title: 'Logout',
        url: '/logout',
        icon: 'log-out'
      }
    ])
  }

  public logout(): void {
    this.logged = false;
    this._id = null;
    this._stuffManager.setPages([
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Search',
        url: '/search',
        icon: 'search'
      },
      {
        title: 'Login',
        url: '/login',
        icon: 'log-in'
      },
      {
        title: 'Signup',
        url: '/signup',
        icon: 'person-add'
      }
    ])
  }
}
