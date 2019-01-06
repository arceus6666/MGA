import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { StuffManagerService } from '../services/stuff-manager.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public game_name: string;
  public searched: boolean;
  public searched2: boolean;
  public game: any;
  public stars = [];
  public gstars = [];
  public image: string;
  public pfs: Array<boolean>;
  public games: Array<any>;

  constructor(
    private _restapi: RestapiService,
    private _stuffManager: StuffManagerService
  ) {
    this.searched = false;
    this.searched2 = false;
    this.game = {};
    // ps, xbox, windows, otro
    this.pfs = [false, false, false, false];
    this.games = [];
    let id = this._stuffManager.getRoutedGame();
    if (id) {
      this._stuffManager.showLoading('Loading...', 1);
      this.searched2 = false;
      this.stars = [];
      this.pfs = [false, false, false, false];
      this._restapi.getGlobal('/games/find/' + id, '').subscribe(data => {
        this._stuffManager.setRoutedGame(null);
        let mdata: any = data;
        let g: any = mdata.msg;
        if (mdata.ok) {
          this.game.name = g.name;
          this.game.img = g.img;
          this.game.description = g.description
          this.game.company = g.company
          this.game.genres = g.genres
          this.game.platforms = g.platforms
          this.game.released = g.released
          this.game.rating = g.rating

          this.image = '../../assets/images/' + g.img + '.png';
          let splt = (this.game.rating + '').split('.');
          let ns = [parseInt(splt[0]), parseInt(splt[1])];
          for (let i = 0; i < 5; i++) {
            if (ns[0] > i)
              this.stars.push('../../assets/images/star.png');
            else
              this.stars.push('../../assets/images/star-empty.png');
          }
          if (ns[0] < 5) {
            if (ns[1] > 0) {
              this.stars[ns[0]] = ('../../assets/images/star-half.png');
            } else {
              this.stars[4] = ('../../assets/images/star-empty.png');
            }
          }

          for (let p in g.platforms) {
            let txt = g.platforms[p].toLowerCase();
            if (txt.includes('playstation')) {
              this.pfs[0] = true;
            } else if (txt.includes('xbox')) {
              this.pfs[1] = true;
            } else if (txt.includes('windows')) {
              this.pfs[2] = true;
            } else {
              this.pfs[3] = true;
            }
          }
          this.searched = true;
        }
      }, err => {
        let e: any = err;
        e = e.error.msg.errmsg;
        this._stuffManager.showAlert('Error', null, e)
      })
    }
  }

  ngOnInit() {
  }

  public search(): void {
    this._stuffManager.showLoading('Searching...', 1);
    this.searched2 = false;
    this.stars = [];
    this.pfs = [false, false, false, false];
    this._restapi.getGlobal('/games/find-name', this.game_name).subscribe(data => {
      let mdata: any = data;
      let g: any = mdata.msg;
      if (mdata.ok) {
        this.game.name = g.name;
        this.game.img = g.img;
        this.game.description = g.description
        this.game.company = g.company
        this.game.genres = g.genres
        this.game.platforms = g.platforms
        this.game.released = g.released
        this.game.rating = g.rating

        this.image = '../../assets/images/' + g.img + '.png';
        let splt = (this.game.rating + '').split('.');
        let ns = [parseInt(splt[0]), parseInt(splt[1])];
        for (let i = 0; i < 5; i++) {
          if (ns[0] > i)
            this.stars.push('../../assets/images/star.png');
          else
            this.stars.push('../../assets/images/star-empty.png');
        }
        if (ns[0] < 5) {
          if (ns[1] > 0) {
            this.stars[ns[0]] = ('../../assets/images/star-half.png');
          } else {
            this.stars[4] = ('../../assets/images/star-empty.png');
          }
        }

        for (let p in g.platforms) {
          let txt = g.platforms[p].toLowerCase();
          console.log(txt)
          if (txt.includes('playstation')) {
            this.pfs[0] = true;
          } else if (txt.includes('xbox')) {
            this.pfs[1] = true;
          } else if (txt.includes('windows')) {
            this.pfs[2] = true;
          } else {
            this.pfs[3] = true;
          }
        }
        this.searched = true;
      }
    }, err => {
      let e: any = err;
      e = e.error.msg.errmsg;
      this._stuffManager.showAlert('Error', null, e)
    })
  }

  public searchP(platform: string): void {
    this.gstars = [];
    this._stuffManager.showLoading('Searching...', 1);
    this._restapi.getGlobal('/games/find-platforms', platform).subscribe(data => {
      let mdata: any = data;
      mdata = mdata.msg;
      this.games = mdata;

      for (let g in this.games) {
        this.gstars.push([])
        let splt = (this.games[g].rating + '').split('.');
        let ns = [parseInt(splt[0]), parseInt(splt[1])];
        for (let i = 0; i < 5; i++) {
          if (ns[0] > i) {
            this.gstars[g].push('../../assets/images/star.png');
          } else {
            this.gstars[g].push('../../assets/images/star-empty.png');
          }
        }
        if (ns[0] < 5) {
          if (ns[1] > 0) {
            this.gstars[g][ns[0]] = ('../../assets/images/star-half.png');
          } else {
            this.gstars[g][4] = ('../../assets/images/star-empty.png');
          }
        }
      }
      this.searched2 = true
    }, err => {
      this._stuffManager.showAlert('Error', null, err)
    })
  }

  public searchG(genre: string): void {
    this.gstars = [];
    this._stuffManager.showLoading('Searching...', 1);
    this._restapi.getGlobal('/games/find-genres', genre).subscribe(data => {
      let mdata: any = data;
      mdata.msg;
      this.games = mdata;
      for (let g in this.games) {
        this.gstars.push([]);
        let splt = (this.games[g].rating + '').split('.');
        let ns = [parseInt(splt[0]), parseInt(splt[1])];
        for (let i = 0; i < 5; i++) {
          if (ns[0] > i) {
            this.gstars[g].push('../../assets/images/star.png');
          } else {
            this.gstars[g].push('../../assets/images/star-empty.png');
          }
        }
        if (ns[0] < 5) {
          if (ns[1] > 0) {
            this.gstars[g][ns[0]] = ('../../assets/images/star-half.png');
          } else {
            this.gstars[g][4] = ('../../assets/images/star-empty.png');
          }
        }
      }
      this.searched2 = true;
    }, err => {
      let e: any = err;
      this._stuffManager.showAlert('Error', null, e.msg);
    })
  }

  public clearSearch(): void {
    this.searched = false;
    this.searched2 = false;
    this.stars = [];
    this.gstars = [];
    this.pfs = [false, false, false, false];
  }

  public changeGame(game): void {
    this.searched2 = false;
    this.pfs = [false, false, false, false];
    this._stuffManager.showLoading('Loading...', 1);
    this.game = game;
    this.image = '../../assets/images/' + game.img + '.png';
    let splt = (this.game.rating + '').split('.');
    let ns = [parseInt(splt[0]), parseInt(splt[1])];
    for (let i = 0; i < 5; i++) {
      if (ns[0] > i)
        this.stars.push('../../assets/images/star.png');
      else
        this.stars.push('../../assets/images/star-empty.png');
    }
    if (ns[0] < 5) {
      if (ns[1] > 0) {
        this.stars[ns[0]] = ('../../assets/images/star-half.png');
      } else {
        this.stars[4] = ('../../assets/images/star-empty.png');
      }
    }

    for (let p in game.platforms) {
      let txt = game.platforms[p].toLowerCase();
      if (txt.includes('playstation')) {
        this.pfs[0] = true;
      } else if (txt.includes('xbox')) {
        this.pfs[1] = true;
      } else if (txt.includes('windows')) {
        this.pfs[2] = true;
      } else {
        this.pfs[3] = true;
      }
    }
    this.searched = true;
  }
}
