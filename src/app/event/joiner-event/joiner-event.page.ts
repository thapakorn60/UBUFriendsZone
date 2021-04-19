import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { JoinsService } from 'src/app/api/joins.service';

@Component({
  selector: 'app-joiner-event',
  templateUrl: './joiner-event.page.html',
  styleUrls: ['./joiner-event.page.scss'],
})
export class JoinerEventPage implements OnInit {
 // Data passed in by componentProps
  // @Input() firstName: string;
  // @Input() lastName: string;
  // @Input() middleInitial: string;
  @Input() postId: string;
  allJoin: any;
  joiner: any;
  dataJoin: any;

  constructor(public modalCtrl: ModalController,
              public joinService: JoinsService,
              public alertController: AlertController) { }

  ngOnInit() {
    console.log('id : ', this.postId);
    this.joinService.getJoin().subscribe(data => {
      this.allJoin = data.response;
      this.joiner = this.allJoin.filter(joiner => joiner.postId === this.postId);
      console.log(this.joiner.length);
    });
  }

  async accept(id: string) {
    const alert2 = await this.alertController.create({
      header: 'ยอมรับ',
      message: 'คุณต้องการยอมรับผู้ใช้คนนี้เข้าร่วมอีเว้นท์',
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
            // console.log(id);
            this.joinService.getidJoin(id).subscribe(data => {
              this.dataJoin = data;
              console.log(this.dataJoin);
              const postId = this.dataJoin.postId;
              // console.log('postId naja ', postId);
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

              const varJoin = {
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
                type
              };
              console.log(varJoin);

              console.log('this is a ' + id);
              this.joinService.acceptjoin(id,
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
                type);
          });
        }
        }
      ]
    });
    await alert2.present();
}

  async reject(id: string) {
    const alert = await this.alertController.create({
      header: 'ปฏิเสธ',
      message: 'คุณต้องการที่จะปฏิเสธคำขอเข้าร่วมอีเว้นท์ของผู้ใช้คนนี้',
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
            console.log(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async leave(id: string) {
    const alert = await this.alertController.create({
      header: 'ปฏิเสธ',
      message: 'คุณต้องการที่จะปฏิเสธคำขอเข้าร่วมอีเว้นท์ของผู้ใช้คนนี้',
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
            console.log(id);
            this.joinService.leaveJoin(id);
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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }
}
