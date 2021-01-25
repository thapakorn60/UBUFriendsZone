import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { PostsService } from '../api/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  Post = {
    description: '',
    type: '',
    datetime: '',
    place: '',
    location: '',
    amount: ''
  };
  map: any;
  lat: number;
  long: number;
  constructor(private geolocation: Geolocation,
              private postsService: PostsService) { }


  // post() {
  //   console.log(this.Post);
  // }
  showlocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log(resp);
      this.lat =  resp.coords.latitude;
      this.long = resp.coords.longitude;
      console.log(this.lat, ' ' , this.long);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // const watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //   console.log(data);
    //   // console.log(data., data.coords.longitude)
    // });
  }
  addpost(){
    this.postsService.addPost(
      this.Post.description,
      this.Post.type,
      this.Post.datetime,
      this.Post.place,
      this.Post.location,
      this.Post.amount

    );
  }
  ngOnInit() {
  }
}

