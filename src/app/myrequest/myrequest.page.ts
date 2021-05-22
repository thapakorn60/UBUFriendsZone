import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, ModalController, NavController } from '@ionic/angular';
import { JoinsService } from '../api/joins.service';



@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.page.html',
  styleUrls: ['./myrequest.page.scss'],
})
export class MyrequestPage implements OnInit {
  @Input() myId: string;
  myData: any;
  myJoin: any;
  constructor(public modalCtrl: ModalController,
              public joinService: JoinsService,
              public navCtrl: NavController,
              public router: Router) { }

  ngOnInit() {
    // console.log(this.myId);
    this.joinService.getJoin().subscribe(data => {
      this.myData = data.response;
      this.myJoin = this.myData.filter(res => res.joinerId === this.myId && res.status === false);
      console.log(this.myJoin);

    });

  }
  cancel(id: string){
    this.joinService.leaveJoin(id);
    window.location.reload();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

}
