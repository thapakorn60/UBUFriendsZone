import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  logData: {};
  constructor(private http: HttpClient) { }
  // getallPost(){
  //   return this.http.get('http://localhost:3000/post/getallpost');
  // }
  addPost(
    description: string,
    type: {},
    datetime: string,
    place: string,
    location: string,
    amount: string
  ){
    this.logData = {
      description,
      type,
      datetime,
      place,
      location,
      amount
    };
    console.log(this.logData);
    this.http.post('http://localhost:3000/post/addpost', this.logData).subscribe((res) => {
      console.log(res);
    });
  }
}
