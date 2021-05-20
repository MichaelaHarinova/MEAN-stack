import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Friend} from './friend';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  url = 'http://localhost:9001/addFriend';
  urlDel = 'http://localhost:9001/deleteFriend';
  urlUpdate = 'http://localhost:9001/updateFriend';
  urlEdit = 'http://localhost:9001/editFriend';

  constructor(
    private http: HttpClient,
  ) {
  }

  addFriend(friend: Friend): Observable<any> {
    return this.http.post(this.url, friend);
  }

  deleteFriend(friend: Friend): Observable<any> {
    return this.http.post(this.urlDel, friend);
  }

 /* editFriend(friend: Friend): Observable<any> {
    return  this.http.get(this.urlEdit);
  }*/
  updateFriend(friend: Friend, updatedFriend: Friend): Observable<any> {
    updatedFriend.email = friend.email;
    return this.http.post(this.urlUpdate, updatedFriend);
  }
}
