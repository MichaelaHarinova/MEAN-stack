import {Component} from '@angular/core';
import {Friend} from './friend';
import {FriendService} from './friend.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN-stack';
  allFriends: Friend[];
  friend = new Friend();
  constructor(
    private friendService: FriendService,
  ) {
    this.friendService = friendService;
  }
  onSubmit(): void {
    this.friendService.addFriend(this.friend).subscribe
    (data => this.getRequest().then(res => console.log(this.allFriends)),
        error => console.error(error));
  }
  public async deleteFriend(friend: Friend): Promise<any> {
    this.friendService.deleteFriend(friend).subscribe
    (response => this.getRequest().then(res => console.log(response)), error => console.error(error));
  }
  public async updateFriend(friend: Friend): Promise<any> {
    this.friendService.updateFriend(friend, this.friend).subscribe
    (response => this.getRequest().then(res => console.log(response)), error => console.error(error));
  }
  /*
  public async editFriend(friend: Friend): Promise<any> {
    this.friendService.editFriend(friend).subscribe
    (response => this.getRequest().then(res => console.log(response)), error => console.error(error));
  }*/
  async getRequest(): Promise<any> {
    // custom getter
    await fetch('http://localhost:9001/allFriends', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => this.allFriends = data);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): any {
    this.getRequest().then(res => console.log(this.allFriends));
  }
}
