import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { timeStamp } from 'console';
import { JoinsService } from '../api/joins.service';
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

  constructor(public alertController: AlertController,
              private joinService: JoinsService,
              private postService: PostsService) {}
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
