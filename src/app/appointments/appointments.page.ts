import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage {

  constructor(public alertController: AlertController) {}

  async cancel() {
    const alert = await this.alertController.create({
      header: 'ยกเลิกนัดหมาย',
      message: 'คุณต้องการยกเลิกกิจกรรมนี้',
    buttons: [
      {
        text: 'ยกเลิก',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancel');
      }
    },
      {
        text: 'ใช่',
        handler: () => {
          console.log('Saved');
          // console.log(data.name1);
        }
      }
    ]
  });
    await alert.present();
  }


  async location() {
    const alert = await this.alertController.create({
      header: 'สถานที่',
      message: 'ยังดูไม่ได้',
    buttons: [
      {
        text: 'ยกเลิก',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancel');
      }
    },
      {
        text: 'ใช่',
        handler: () => {
          console.log('Saved');
          // console.log(data.name1);
        }
      }
    ]
  });
    await alert.present();
  }

}
