import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../api/users.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  user: Subscription;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    // this.usersService.getUser().subscribe(data => {
    //   console.log(data);
    // });
    // this.user = this.usersService.getUser().subscribe(data => {
    //   console.log(data);
    // });
  }
  ngOnDestroy() {
    this.user.unsubscribe();
  }

}
