/* tslint:disable */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { JoinsService } from 'src/app/api/joins.service';
import { NotificationsService } from 'src/app/api/notifications.service';
import { PostsService } from 'src/app/api/posts.service';
import { UsersService } from 'src/app/api/users.service';
import { CommentsPage } from 'src/app/comments/comments.page';
import { UserProfile } from 'src/app/models/user';


@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.page.html',
  styleUrls: ['./eventdetail.page.scss'],
})
export class EventdetailPage implements OnInit {
  @Input() postId: string;
  // @Input() eventname: string;
  public userProfile: UserProfile;
  dataPost: any;
  description: any;
  name: any;
  type: any;
  datetime: any;
  starttime: any;
  endtime: any;
  place: any;
  location: any;
  amount: any;
  createAt: any;
  allJoin: any;
  thisJoin: any;
  iduser: string;
  join: boolean;
  joinerId: string;
  status: boolean;
  userid: any;
  email_login = ""
  data_user_login = {}
  url = 'http://localhost:3000/user/getuserDetail';
  userDetail: Object;
  countJoin: any;
  total: number;
  eventname: any;

  constructor(public modalCtrl: ModalController,
              public alertController: AlertController,
              public postService: PostsService,
              public http: HttpClient,
              public joinService: JoinsService,
              public userService: UsersService,
              public notiService: NotificationsService) {
                this.email_login = localStorage.getItem('data_user');
                this.http.get<{ messaeg: string, email: string, status: any }>(this.url + '/' + this.email_login).subscribe((res) => {
                  this.data_user_login = res;
                })
            }

  ngOnInit() {
    console.log('id: ', this.postId);
    this.iduser = localStorage.getItem('id_user');
    this.userService.getidUser(this.iduser).subscribe(data => {
      this.userDetail = data;
      console.log(this.userDetail);
      
    })
    this.postService.getidPost(this.postId).subscribe(data => {
      this.dataPost = data;
      this.userid = this.dataPost.userid;
      this.eventname = this.dataPost.eventname;
      this.name = this.dataPost.name;
      this.type = this.dataPost.type,
      this.datetime = this.dataPost.datetime,
      this.starttime = this.dataPost.starttime,
      this.endtime = this.dataPost.endtime,
      this.place = this.dataPost.place,
      this.location = this.dataPost.location,
      this.amount = this.dataPost.amount,
      this.description = this.dataPost.description;
      this.createAt = this.dataPost.createdAt;
      console.log(this.dataPost);
      this.joinService.getJoin().subscribe(dataJoin => {
        this.allJoin = dataJoin.response;

        this.thisJoin = this.allJoin.filter(join => join.joinerId === this.iduser && join.postId === this.postId);
        this.countJoin = this.allJoin.filter(join => join.postId == this.postId && join.status == true).length
        this.total = this.amount - this.countJoin;
        console.log(this.thisJoin.length);
        console.log(this.countJoin);
        console.log(this.total);
        


        if (this.thisJoin.length > 0){
          this.join = true;
        }else if (this.thisJoin.length === 0) {
          this.join = false;
        }
        console.log(this.thisJoin);

          });

    });

  }

  async gotoComment(name: string, id: string , uid: string) {
    // console.log(id);
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        eventname: name,
        postId: id,
        userid: uid
      }
    });
    return await modal.present();
  }

  async Join(id: string) {
    const alert = await this.alertController.create({
      header: 'คุณต้องการเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการที่จะเข้าร่วมอีเว้นท์',
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
            console.log('confirm');
            this.join = true;
            this.postService.getidPost(id).subscribe(data => {
              this.dataPost = data;

              const postId = this.dataPost._id;
              const postName = this.dataPost.eventname;
              const ownerId = this.dataPost.userid;
              const ownerName = this.dataPost.name;
              const joinerName = this.data_user_login.name;
              this.joinerId = localStorage.getItem('id_user');
              this.status = false;
              const datetime = this.dataPost.datetime;
              const starttime = this.dataPost.starttime;
              const endtime = this.dataPost.endtime;
              const place = this.dataPost.place;
              const type = this.dataPost.type;
              const press = 'request';
              const inject = false;
              const description = 'ขอเข้าร่วมอีเว้นท์';
              const read = false;
              // tslint:disable-next-line:max-line-length
              this.joinService.addJoin(postId, postName, ownerName, ownerId, joinerName, this.joinerId, this.status, datetime, starttime, endtime, place, type);
              // tslint:disable-next-line:max-line-length
              this.notiService.addNotification(postId, postName, ownerName, ownerId, joinerName, this.joinerId, this.status, datetime, starttime, endtime, place, type, press, inject, description, read);

            });


          }
        }
      ]
    });
    await alert.present();
  }

  // tslint:disable-next-line:variable-name
  async notJoin(Post_id: string, id: string) {
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
            console.log('confirm');
            this.join = false;
            // this.postService.getidPost(Post_id).subscribe(data => {
            //   this.dataPost = data;
            //   const postId = this.dataPost['_id'];
            //   const joinerId = localStorage.getItem('id_user');

            this.joinService.leaveJoin(id);

            // });
            // this.joinService.getJoin().subscribe(data => {
            //   this.nowjoin = data;
            //   const idUser = localStorage.getItem('id_user');
            //   const postId = this.nowjoin['postId'];
            //   console.log(postId);
            // });


          }
        }
      ]
    });
    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }


}
