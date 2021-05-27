import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../api/notifications.service';

import { HttpClient } from '@angular/common/http';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { UsersService } from '../api/users.service';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  allNoti: any;
  notiData: any;
  iduser: string;
  detail: any;

  constructor(public notiService: NotificationsService,
              public alertController: AlertController,
              public userService: UsersService) { }

  ngOnInit() {
    this.iduser = localStorage.getItem('id_user');
    // this.userService.getidUser(this.iduser).subscribe(result => {
    //   this.detail = result;
    // });
    this.notiService.getNotification().subscribe(data => {
      this.allNoti = data.response;
      this.detail = this.allNoti.filter(res => res.joinerId === this.iduser || res.ownerId === this.iduser);

      console.log(this.allNoti);
    });
  }

  markRead(id: string){
    this.notiService.getidNoti(id).subscribe(data => {
      this.notiData = data;
      const postId = this.notiData.postId;
      // console.log('postId naja ', postId);
      const postName = this.notiData.postName;
      const ownerName = this.notiData.ownerName;
      const ownerId = this.notiData.ownerId;
      const joinerName = this.notiData.joinerName;
      const joinerId = this.notiData.joinerId;
      const status = this.notiData.status;
      const datetime = this.notiData.datetime;
      const starttime = this.notiData.starttime;
      const endtime = this.notiData.endtime;
      const place = this.notiData.place;
      const type = this.notiData.type;
      const press = this.notiData.press;
      const inject = this.notiData.inject;
      const description = this.notiData.description;
      const read = true;
      this.notiService.markRead(id,
        postId,
        postName,
        ownerName,
        ownerId,
        joinerName,
        joinerId,
        status,
        datetime,
        starttime,
        endtime,
        place,
        type,
        press,
        inject,
        description,
        read);
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
