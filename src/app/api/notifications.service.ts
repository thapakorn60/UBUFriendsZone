import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notiData: {};


  constructor(private http: HttpClient) { }
  addNotification(
    postId: string,
    postName: string,
    ownerName: string,
    ownerId: string,
    joinerName: string,
    joinerId: string,
    status: boolean,
    datetime: string,
    starttime: string,
    endtime: string,
    place: string,
    type: object,
    description: string,
    read: boolean
  ){
    this.notiData = {
      postId,
      postName,
      ownerId,
      ownerName,
      joinerName,
      joinerId,
      status,
      datetime,
      starttime,
      endtime,
      place,
      type,
      description,
      read
    };
    this.http.post('http://localhost:3000/notification/addNotification', this.notiData).subscribe((res) => {
      console.log(res);
    });
  }

  getNotification() {
    return this.http.get<{ response: any }>('http://localhost:3000/notification/getAllNotification');
  }

  delete(id: string){
    console.log(id);
    this.http.delete('http://localhost:3000/notification/deleteNoti/' + id).subscribe(res => {
      console.log(res);
    });
  }


}
