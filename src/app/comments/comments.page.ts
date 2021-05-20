import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { JoinsService } from 'src/app/api/joins.service';
import { CommentsService } from '../api/comments.service';
import { UsersService } from '../api/users.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @Input() eventname: string;
  @Input() postId: string;
  @Input() userid: string;

  allJoin: any;
  joiner: any;
  userId: any;
  // tslint:disable-next-line:variable-name
  email_login = '';
  // tslint:disable-next-line:variable-name
  data_user_login = {};
  url = 'http://localhost:3000/user/getuserDetail';
  Comment = {
    postId: '',
    ownerName: '',
    ownerId: '',
    description: '',
    // reqtojoin:[]
  };
  userName: any;
  allComment: any;
  ownerId: any;
  status: any;
  thisJoin: any;
  joinerId: any;
  thisComment: any;

  constructor(public modalCtrl: ModalController,
              public alertController: AlertController,
              public joinService: JoinsService,
              private userService: UsersService,
              public commentService: CommentsService,
              private http: HttpClient,
              ) {}

  ngOnInit() {
    console.log('name : ', this.eventname);
    console.log('Postid : ', this.postId);
    console.log('userid : ', this.userid);
    this.userService.getUser().subscribe(user => {
      this.userId = user._id;
      this.userName = user.name;
      // console.log(this.userId);
      // console.log(this.userName);
    });
    this.commentService.getComment().subscribe(data => {
      this.allComment = data.response;
      this.thisComment = this.allComment.filter(comment => comment.postId === this.postId);
      console.log(this.thisComment);
    });
    this.joinService.getJoin().subscribe(data => {
      this.allJoin = data.response;
      this.joiner = this.allJoin.filter(joiner => joiner.postId === this.postId && joiner.status === true);
      console.log(this.joiner);
      // tslint:disable-next-line:forin
      for (const i in this.joiner){
        this.thisJoin = this.joiner[i];
        this.ownerId = this.thisJoin.ownerId;
        this.joinerId = this.thisJoin.joinerId;
        this.status = this.thisJoin.status;
        // console.log(this.thisJoin.postName);
        // console.log('ownerId :', this.ownerId);
        // console.log('joinerId :', this.joinerId);
        // console.log('status :', this.status);
      }

    });
  }

  addComment(){
    this.commentService.addComment(
      this.postId,
      this.userName,
      this.userId,
      this.Comment.description
    );
  }

  async deleteComment(id: string) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'คุณต้องการจะลบคอมเมนท์นี้',
      // cssClass: 'buttonCss',
      buttons: [
        {
          text: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'confirm',
          cssClass: 'dangerClass',
          handler: () => {
            this.commentService.deleteComment(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async test() {
    const alert = await this.alertController.create({
      header: 'No more',
      message: 'Do not have anymore',
      buttons: [
        {
          text: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        },
        {
          text: 'confirm',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

}
