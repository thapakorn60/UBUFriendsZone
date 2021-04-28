import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../api/notifications.service';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  allNoti: any;

  constructor(public notiService: NotificationsService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.notiService.getNotification().subscribe(data => {
      this.allNoti = data.response;
      console.log(this.allNoti);
    });
  }

  async delete(id: string) {
    const alert = await this.alertController.create({
      header: 'ลบแจ้งเตือน',
      message: 'คุณต้องการที่จะลบแจ้งเตือนนี้',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Confirm delete : ', id);
            this.notiService.delete(id);
          }
        }
      ]
    });
    await alert.present();
  }

}
