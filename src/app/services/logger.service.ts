import { Injectable } from '@angular/core';
import { StuffManagerService } from './stuff-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logged: boolean;
  private _id: string;

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

  public login(id): void {
    this.logged = true;
    this._id = id;
    this._stuffManager.setPages([
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Profile',
        url: '/profile',
        icon: 'person'
      },
      {
        title: 'Search',
        url: '/search',
        icon: 'search'
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
        title: 'Login',
        url: '/login',
        icon: 'log-in'
      },
      {
        title: 'Search',
        url: '/search',
        icon: 'search'
      }
    ])
  }
}
