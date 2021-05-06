import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { timeStamp } from 'console';
import { JoinsService } from '../api/joins.service';
import { NotificationsService } from '../api/notifications.service';
import { PostsService } from '../api/posts.service';




@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit{
  allJoin: any;
  myJoin: any;
  userId: string;
  allPost: any;
  myPost: any;
  dataJoin: any;

  constructor(public alertController: AlertController,
              private joinService: JoinsService,
              private postService: PostsService,
              public notification: NotificationsService) {}
  ngOnInit() {
    this.joinService.getJoin().subscribe(result => {
      this.allJoin = result.response;
      this.userId = localStorage.getItem('id_user');
      this.myJoin = this.allJoin.filter(join => join.joinerId === this.userId);
      console.log(this.myJoin);
      // console.log(userId);
    });
    this.postService.getallPost().subscribe(result => {
      this.allPost = result.response;
      const idUser = localStorage.getItem('id_user');
      this.myPost = this.allPost.filter(post => post.userid === idUser);
    });
  }

  async leavejoin(id: string) {
    const alert = await this.alertController.create({
      header: 'ยกเลิกเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการที่จะยกเลิกการเข้าร่วมอีเว้นท์',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.joinService.getidJoin(id).subscribe(data => {
              this.dataJoin = data;
              console.log(this.dataJoin);
              const postId = this.dataJoin.postId;
              const postName = this.dataJoin.postName;
              const ownerName = this.dataJoin.ownerName;
              const ownerId = this.dataJoin.ownerId;
              const joinerName = this.dataJoin.joinerName;
              const joinerId = this.dataJoin.joinerId;
              const status = true;
              const datetime = this.dataJoin.datetime;
              const starttime = this.dataJoin.starttime;
              const endtime = this.dataJoin.endtime;
              const place = this.dataJoin.place;
              const type = this.dataJoin.type;
              const press = 'out';
              const inject = false;
              const description = 'ออกจากกิจกรรม';
              const read = false;

              // tslint:disable-next-line:max-line-length
              this.notification.addNotification(postId, postName, ownerName, ownerId, joinerName, joinerId, status, datetime, starttime, endtime, place, type, press, inject, description, read);
            });
            this.joinService.leaveJoin(id);
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
  moveToNext(slides){
    // console.log(slides);
    slides.slideNext();
}
moveToPrev(slides){
  // console.log(slides);
  slides.slidePrev();
}

}
