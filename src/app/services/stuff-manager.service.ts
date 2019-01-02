import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StuffManagerService {

  private appPages;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.appPages = [
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
    ];
  }

  public getPages(): Array<Object> {
    return this.appPages;
  }

  public setPages(pages): void {
    this.appPages = pages;
  }

  /**
   * Shows a custom alert.
   * @param header Header shown for the alert.
   * @param subheader Subheader shown for the alert.
   * @param message Message shown for the alert.
   * @param buttons Button names for the alert.
   */
  public async showAlert(
    header: string,
    subheader?: string,
    message?: string,
    buttons?: Array<string>
  ) {
    let alert = await this.alertCtrl.create({
      header: header,
      buttons: ['Ok']
    });

    if (subheader) {
      alert.subHeader = subheader;
    }

    if(message) {
      alert.message = message;
    }

    if (buttons) {
      alert.buttons = buttons;
    }

    await alert.present();
  }

  /**
   * Shows a custom loading popup.
   * @param msg Message shown in the popup
   * @param duration Duration of the popup (in seconds).
   */
  public async showLoading(msg?: string, duration?: number) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 1000 * duration
    });
    await loading.present();
  }

}
