/* tslint:disable */
import { Component, OnDestroy, OnInit, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { empty, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


// import * as firebase from 'firebase';
import '@firebase/auth';
import { AuthenticateService } from '../services/authentication.service';

import { UserProfile } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login.page';
import { stringify } from '@angular/compiler/src/util';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';

import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from '../api/posts.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UsersService } from '../api/users.service';
import { JoinsService } from '../api/joins.service';
import { NotificationsService } from '../api/notifications.service';
import { HistoriesService } from '../api/histories.service';
import { EventdetailPage } from '../event/eventdetail/eventdetail.page';
// import { time } from 'console';
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { checkAvailability } from '@ionic-native/core';
import { ProfileuserPage } from '../profileuser/profileuser.page';
import { MyrequestPage } from '../myrequest/myrequest.page';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public posts: PostsService;
  public userProfile: UserProfile;

  post: Subscription;
  user: any = {};
  userEmail: string;
  allPost;
  Post: any = [];
  email_login = ""
  data_user_login = {}
  url = 'http://localhost:3000/user/getuserDetail';
  detail: Object;
  style: any;
  dataDetail: any;
  postData: any;
  userid: string;
  status: boolean;
  buttonColor = "primary";
  onePost: Object;
  joinerId: string;
  dataPost: Object;
  type = [
    { value: 'all', display: 'ทั้งหมด' },
    { value: 'food', display: 'อาหาร' },
    { value: 'sports', display: 'กีฬา' },
    { value: 'media', display: 'บันเทิง' },
    { value: 'edu', display: 'การศึกษา' },
    { value: 'valun', display: 'กิจกรรม' },
    { value: 'other', display: 'อื่นๆ' },
  ]
  numberTime = [
    { value: 0, display: '00.00 น.' },
    { value: 1, display: '01.00 น.' },
    { value: 2, display: '02.00 น.' },
    { value: 3, display: '03.00 น.' },
    { value: 4, display: '04.00 น.' },
    { value: 5, display: '05.00 น.' },
    { value: 6, display: '06.00 น.' },
    { value: 7, display: '07.00 น.' },
    { value: 8, display: '08.00 น.' },
    { value: 9, display: '09.00 น.' },
    { value: 10, display: '10.00 น.' },
    { value: 11, display: '11.00 น.' },
    { value: 12, display: '12.00 น.' },
    { value: 13, display: '13.00 น.' },
    { value: 14, display: '14.00 น.' },
    { value: 15, display: '15.00 น.' },
    { value: 16, display: '16.00 น.' },
    { value: 17, display: '17.00 น.' },
    { value: 18, display: '18.00 น.' },
    { value: 19, display: '19.00 น.' },
    { value: 20, display: '20.00 น.' },
    { value: 21, display: '21.00 น.' },
    { value: 22, display: '22.00 น.' },
    { value: 23, display: '23.00 น.' },
    { value: 24, display: 'ก่อน 00.00 น.' },
  ]

  typecate: string;
  datecate: string;
  timeScate: number;
  timeEcate: number;

  private authStatusSub: Subscription;
  isLoading = false;


  dataJoin: { response: any; };
  allJoin: any;
  joinData: any;
  postDetail: any;
  public statusJoin: boolean;
  public join: boolean;
  public notjoin: boolean;
  public userId;
  thisJoin: any;
  joinChecked: any;
  item = [];
  public isMenuOpen: boolean;
  public ishidden = false;
  total: any;
  joinThisPost: { response: any; };
  notilength: any;
  iduser: string;
  modeEvent = '';
  styleData: any;
  name: any;
  public unique: any[];
  itemIntro = [];
  myStyle: any[];
  countJoin: any;

  constructor(public alertController: AlertController,
    private postsService: PostsService,
    private menu: MenuController,
    public popoverController: PopoverController,
    private postService: PostsService,
    private router: Router,
    private http: HttpClient,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private authService: AuthService,
    private userService: UsersService,
    private joinService: JoinsService,
    public modalController: ModalController,
    private render: Renderer2,
    public notiService: NotificationsService,
    public historyService: HistoriesService,
    private changeRef: ChangeDetectorRef) {

    this.email_login = localStorage.getItem('data_user');
    this.http.get<{ messaeg: string, email: string, status: any }>(this.url + '/' + this.email_login).subscribe((res) => {
      this.data_user_login = res

    })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async addtojoin(Post_id: string) {
    const alert = await this.alertController.create({
      header: 'สนใจ',
      message: 'คุณสนใจที่จะเข้าร่วมกิจกรรมนี้',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'สนใจ',
          handler: async () => {
            console.log('Send request to Event');


            this.postService.getallPost().subscribe(result => {
              this.allPost = result.response;
              console.log(this.allPost);

            });

            this.postService.getidPost(Post_id).subscribe(data => {
              this.dataPost = data;

              const postId = this.dataPost['_id']
              const postName = this.dataPost['eventname']
              const ownerId = this.dataPost['userid']
              const ownerName = this.dataPost['name']
              const joinerName = this.data_user_login['name']
              this.joinerId = localStorage.getItem('id_user');
              this.status = false;
              const datetime = this.dataPost['datetime']
              const starttime = this.dataPost['starttime']
              const endtime = this.dataPost['endtime']
              const place = this.dataPost['place']
              const type = this.dataPost['type']
              const press = 'request';
              const inject = false;
              const description = 'ขอเข้าร่วมอีเว้นท์';
              const read = false;
              this.joinService.addJoin(postId, postName, ownerName, ownerId, joinerName, this.joinerId, this.status, datetime, starttime, endtime, place, type);
              // tslint:disable-next-line:max-line-length
              this.notiService.addNotification(postId, postName, ownerName, ownerId, joinerName, this.joinerId, this.status, datetime, starttime, endtime, place, type, press, inject, description, read);

            });

            console.log()
          }
        }
      ]
    });
    await alert.present();
  }


  async leavejoin(Post_id: string) {
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
            console.log();
            // this.joinService.leaveJoin(Post_id);
            // this.postService.getidPost(Post_id).subscribe(data => {
            // this.joinerId = localStorage.getItem('id_user');
            // if () { }
            //   this.dataPost = data;
            //   const postId = this.dataPost['_id']
            //   const postName = this.dataPost['eventname']
            //   this.joinerId = localStorage.getItem('id_user');
            //   this.status = false;
            //   this.joinService.addJoin(postId, postName, this.joinerId, this.status);
            // });
          }
        }
      ]
    });
    await alert.present();
  }

  // --------------------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.authStatusSub = this.userService
    .getAuthStatusListener()
    .subscribe((authStatus) => {
      this.isLoading = false;
    });
    this.typecate = 'all';
    // this.modeEvent = 'normal'
    this.timeScate = 0;
    this.timeEcate = 24;

    this.userService.getUser().subscribe(user => {
      this.userId = user['_id'];
      console.log(this.userId);
    });
    // console.log(this.userId);

    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
    this.notiService.getNotification().subscribe(data => {
      // this.total = data.response.length;
      this.total = data.response.filter(res => res.read == false &&( res.ownerId == this.iduser || res.joinerId == this.iduser));
      this.notilength = this.total.length;
      console.log('noti : ', this.notilength);

    });

    this.iduser = localStorage.getItem('id_user');
    this.userService.getidUser(this.iduser).subscribe(result => {
      this.detail = result;
      // console.log(this.detail['lifestyle']);
      this.style = this.detail['lifestyle'];
      this.name = this.detail['name'];
      console.log('MyStyle: ', this.style);
    });

      this.postService.getallPost().subscribe(result => {
        this.allPost = result.response;
        this.modeEvent = 'normal'
        const postId = this.allPost['_id'];
        this.style.forEach(element => {
          console.log(element);
          this.postData = this.allPost.filter(post =>
            post.type.includes(element)
          );
          this.postData.forEach(iData => {
            this.item.push(iData);
          });
              console.log('cate : ', this.postData);
        });
        
        this.unique = Array.from(new Set(this.item.map(a => a._id))).map(id => {
          return this.item.find(a => a._id === id)
        })
        this.unique.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        console.log(this.myStyle);
        const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
        this.itemIntro = findDuplicates(this.item);
        console.log(this.itemIntro);
        // console.log(this.modeEvent);

        this.joinService.getJoin().subscribe(data => {
          this.allJoin = data.response;
          this.thisJoin = this.allJoin.filter(join => join.joinerId == this.iduser);
          this.countJoin = this.allJoin.filter(join => join.status == true);
          // console.log('myjoin : ', this.thisJoin);
          // console.log('count ', this.countJoin.length);
        });
        
      });
     
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        
    
    // ------------------------------------------------------------------------------------------------------
    // this.postService.getallPost().subscribe(result => {
    //   this.modeEvent = 'normal';

    //   this.allPost = result.response;
    //   console.log('allpost : ', this.allPost);
    //   const iduser = localStorage.getItem('id_user');
    //   this.join = true;
    // check(id){
    // this.postService.getidPost(id){}

    // });
    // }
  }

  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  async deletePost(id: string) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'คุณต้องการที่จะลบโพส',
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
            this.joinService.getJoinn(id).subscribe(data => {
              this.joinThisPost = data;
              // console.log(this.joinThisPost);
              for (let join in this.joinThisPost) {
                this.joinChecked = this.joinThisPost[join];

                const postId = this.joinChecked.postId;
                // console.log('postId naja ', postId);
                const postName = this.joinChecked.postName;
                const ownerName = this.joinChecked.ownerName;
                const ownerId = this.joinChecked.ownerId;
                const joinerName = this.joinChecked.joinerName;
                const joinerId = this.joinChecked.joinerId;
                const status = this.joinChecked.status;
                const datetime = this.joinChecked.datetime;
                const starttime = this.joinChecked.starttime;
                const endtime = this.joinChecked.endtime;
                const place = this.joinChecked.place;
                const type = this.joinChecked.type;
                const press = 'delete';
                const inject = false;
                const description = 'ยกเลิกกิจกรรม';
                const read = false;
                // console.log(this.joinChecked.joinerName);
                // tslint:disable-next-line:max-line-length
                this.notiService.addNotification(postId, postName, ownerName, ownerId, joinerName, joinerId, status, datetime, starttime, endtime, place, type, press, inject, description, read);
                // this.historyService.addHistory(postId, postName, ownerName, ownerId, joinerName, joinerId, datetime, starttime, endtime, place, type);

              }
              this.postService.deletePost(id);
              // this.joinService.deleteJoinPost(id);
              // this.notiService.addNotification

            });

          }
        }
      ]
    });
    await alert.present();
  }
  // ngOnDestroy() {
  //   this.post.unsubscribe();
  // }
  async logOut(): Promise<void> {
    await this.authService.logout();
    this.userService.logout();
    localStorage.removeItem('data_user')
    this.router.navigateByUrl('login');
    window.location.reload();
    this.router.navigate(['/login']);
  }

  // -----------------------------test function--------------------------------------------

  async Join(PostId: string) {
    const alert = await this.alertController.create({
      header: 'สนใจเข้าร่วมอีเว้นท์',
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
            this.join = false;
            this.notjoin = true;
            console.log(this.join);
            console.log(this.notjoin);
            this.isMenuOpen = !this.isMenuOpen;

          }
        }
      ]
    });
    await alert.present();
  }


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
            //   this.join = true;
            // this.notjoin = false;
            // console.log(this.join);
            // console.log(this.notjoin);
            // this.isMenuOpen = !this.isMenuOpen;


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

  async gotoComment(name: string, id: string, uid: string) {
    // console.log(id);
    const modal = await this.modalController.create({
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
  async seeMyrequest(id: string){
    const modal = await this.modalController.create({
      component: MyrequestPage,
      cssClass: 'my-custom-class',
      componentProps: {
        myId: id
      }
    });
    return await modal.present();
  }

  async profileUser(id: string){
    const modal  = await this.modalController.create({
      component: ProfileuserPage,
      cssClass: 'my-custom-class',
      componentProps: {
        userid: id,
      }
    });
    return await modal.present();
  }

  async seeDetail(id: string, name: string) {
    // console.log(id);
    const modal = await this.modalController.create({
      component: EventdetailPage,
      cssClass: 'my-custom-class',
      componentProps: {
        postId: id,
        eventname: name
      }
    });
    return await modal.present();
  }
  refresh(){
        window.location.reload();
  }

  getFilter() {
    this.unique = [];
    this.item = [];
    this.postService.getallPost().subscribe(data => {
      // if (this.typecate == 'all') {

      if (this.typecate == 'all' && this.datecate == null) {
        this.allPost = data.response;
        // -----------------------------------------------------------------------
        this.unique = this.allPost.filter(post => {
          const timeS = new Date(post.starttime)
          const timeE = new Date(post.endtime)

          return timeS.getHours() >= this.timeScate && timeE.getHours() <= this.timeEcate;
        });
        console.log(this.unique);
        console.log(this.modeEvent);
        this.modeEvent = 'cate'

      } else if (this.typecate != 'all' && this.datecate == null) {

        this.typecate.forEach(element => {
          this.postData = this.allPost.filter(post => {
          console.log(element);
            const timeS = new Date(post.starttime)
            const timeE = new Date(post.endtime)

            return post.type.includes(element) && timeS.getHours() >= this.timeScate && timeE.getHours() <= this.timeEcate;
          });
          this.postData.forEach(iData => {
            this.item.push(iData);
          });
          //     console.log('cate : ', this.postData);
        });

        this.unique = Array.from(new Set(this.item.map(a => a._id))).map(id => {
          return this.item.find(a => a._id === id)
        })
        this.unique.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        //   console.log(this.unique);
        const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
        this.itemIntro = findDuplicates(this.item);
        console.log('this : ',this.item);
        
        console.log('แนะนำ',this.itemIntro);
          console.log(this.modeEvent);
          this.modeEvent = 'cate'
        // --------------------------------------------------------------------------------
        // console.log('Intro: ',this.item);
      }
      else if (this.typecate != 'all' && this.datecate != null) {
        this.typecate.forEach(element => {
          console.log(element);
          this.postData = this.allPost.filter(post => {
            const time = new Date(post.datetime)
            const timec = new Date(this.datecate)
            const timeS = new Date(post.starttime)
            // const timeStart = new Date(this.timeScate)
            const timeE = new Date(post.endtime)
            // const timeEnd = new Date(this.timeEcate)
            //  return time.getTime() >= timec.getTime();

            return post.type.includes(element) && time.getTime() >= timec.getTime() && timeS.getHours() >= this.timeScate && timeE.getHours() <= this.timeEcate;
            // console.log(timeS.getHours(), timeE.getHours(),'999 ', this.timeScate , this.timeEcate);
          }
          )
          this.postData.forEach(iData => {
            this.item.push(iData);
          })
          console.log('cate : ', this.postData);
        });

        this.unique = Array.from(new Set(this.item.map(a => a._id))).map(id => {
          return this.item.find(a => a._id === id)
        })
        this.unique.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        console.log(this.unique);
        const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
        this.itemIntro = findDuplicates(this.item);
        console.log(this.modeEvent);
        this.modeEvent = 'cate'
      }
      else if (this.typecate == 'all' && this.datecate != null) {

        this.postData = this.allPost.filter(post => {
          const time = new Date(post.datetime)
          const timec = new Date(this.datecate)
          const timeS = new Date(post.starttime)
          const timeE = new Date(post.endtime)
          return time.getTime() >= timec.getTime() && timeS.getHours() >= this.timeScate && timeE.getHours() <= this.timeEcate;
        }
        )
        this.postData.forEach(iData => {
          this.item.push(iData);
        })
        console.log('cate : ', this.postData);


        this.unique = Array.from(new Set(this.item.map(a => a._id))).map(id => {
          return this.item.find(a => a._id === id)
        })
        this.unique.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        console.log(this.unique);
        const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
        this.itemIntro = findDuplicates(this.item);
        console.log(this.modeEvent);
      }
          this.changeRef.detectChanges();

    });
    console.log(this.typecate);
    // console.log(this.typecate.toString());

    // console.log(this.typecate.length);

    console.log(this.datecate);
    console.log(this.timeScate);
    console.log(this.timeEcate);
    // this.modeEvent = 'cate'
    // window.location.reload();
    // this.changeRef.detectChanges();

  }


}

