import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StuffManagerService {

  constructor(
    private alertCtrl: AlertController
  ) { }
  
  public async showAlert(title: string, subtitle: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }
}
