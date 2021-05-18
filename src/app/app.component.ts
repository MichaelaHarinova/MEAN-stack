import {Component} from '@angular/core';
import {Friend} from './friend';
import {AddFriendService} from './add-friend.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN-stack';
  public allFriends = [{firstName: null, lastName: null, email: null, phoneNumber: null, language: null}];
  constructor(
    private addFriendService: AddFriendService,
  ) {
    this.addFriendService = addFriendService;
  }
  languages: string[] = ['HTML', 'CSS', 'JavaScript', 'C#', 'Symfony', '.NET', 'PHP', 'Angular'];
  friend = new Friend('', '', '', 0);

  onSubmit(): void {
    this.addFriendService.addFriend(this.friend).subscribe
    (data => this.getRequest('http://localhost:9001/allFriends').then(res => console.log(this.allFriends)), error => console.error(error));
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

  public async deleteFriend(email: string): Promise<any> {
    await fetch('http://localhost:9001/allFriends', {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json() as Promise<any>;
      })
      .then(response => {
        return this.allFriends = response;
      });
    this.allFriends = this.allFriends.filter(friend => friend.email !== email);
  }
}
