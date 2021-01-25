import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { PostsService } from '../api/posts.service';
import { MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  post: Subscription;
  constructor(public alertController: AlertController,
              private postsService: PostsService,
              private menu: MenuController,
              public popoverController: PopoverController,
              private postService: PostsService) {}

  // async presentPopover(ev: any) {
  //     const popover = await this.popoverController.create({
  //         component: PopoverComponent,
  //             cssClass: 'my-custom-class',
  //             event: ev,
  //             translucent: true
  //             });
  //     return await popover.present();
  //   }


  async showPrompt2() {
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
        handler: () => {
          console.log('Saved');
          // console.log(data.name1);
        }
      }
    ]
  });
    await alert.present();
  }

  ngOnInit() {
    // this.post = this.postsService.getallPost().subscribe(data => {
    //   console.log(data);
    // });

    // this.post = this.postService.getallPost().subscribe(data => {console.log(data);
    // });
  }
  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async deletePost() {
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
          console.log('Deleted');
          // console.log(data.name1);
        }
      }
    ]
  });
    await alert.present();
  }
  // ngOnDestroy() {
  //   this.post.unsubscribe();
  // }


}
