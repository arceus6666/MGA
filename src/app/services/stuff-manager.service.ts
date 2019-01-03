import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class StuffManagerService {

  private appPages;
  private token;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private camera: Camera
  ) {
    this.appPages = [
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

    if (message) {
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


  public takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
      targetHeight: 400,
      targetWidth: 400
    };
    this.camera.getPicture(options).then((imageData) => {
      return 'data:image/png;base64,' + imageData;
    }, err => {
      this.showAlert('An error ocurred with the camera', null, err);
    })
  }

  public storeToken(tk) {
    localStorage.setItem('token', tk);
  }

  public getToken() {
    return localStorage.getItem('token');
  }
}
