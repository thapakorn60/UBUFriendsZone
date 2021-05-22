import { Component, OnInit } from '@angular/core';
import { HistoriesService } from '../api/histories.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  dateNow = Date.now();
  history: any;
  iduser: string;
  myHistory: any;

  constructor(public historyService: HistoriesService) { }

  ngOnInit() {
    this.iduser = localStorage.getItem('id_user');
    this.historyService.getAllHistory().subscribe(data => {
      this.history = data.response;
      this.myHistory = this.history.filter(history => history.joinerId === this.iduser);
      console.log(this.history);

    });
  }
  deleteHistory(id: string){
    this.historyService.deleteHistory(id);
  }

}
