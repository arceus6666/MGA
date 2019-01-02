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
  public game: any;
  public stars = [];
  public image: string;
  constructor(
    private _restapi: RestapiService,
    private _stuffManager: StuffManagerService
  ) {
    this.searched = false;
    this.game = {};
  }

  ngOnInit() {
  }

  public search(): void {
    this.stars = []
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
        this.searched = true;
      }
    }, err => {
      let e: any = err;
      e = e.error.msg.errmsg;
      this._stuffManager.showAlert('Error', null, e)
    })
  }

}
