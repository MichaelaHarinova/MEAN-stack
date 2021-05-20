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
  public allFriends = [{firstName: null, lastName: null, email: null, phoneNumber: null}];
  friend = new Friend('', '', '', 0);
  constructor(
    private friendService: FriendService,
  ) {
    this.friendService = friendService;
  }
  onSubmit(): void {
    this.friendService.addFriend(this.friend).subscribe
    (data => this.getRequest
    ('http://localhost:9001/addFriend').then(res => console.log(this.allFriends)), error => console.error(error));
  }

  async getRequest(url: string): Promise<any> {
    // custom getter
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => this.allFriends = data);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): any {
    this.getRequest('http://localhost:9001/allFriends').then(res => console.log(this.allFriends));
  }

  public async deleteFriend(friend: Friend): Promise<any> {
    this.friendService.deleteFriend(friend).subscribe
    (response => this.getRequest('http://localhost:9001/allFriends').then(res => console.log(response)), error => console.error(error));
  }
}
