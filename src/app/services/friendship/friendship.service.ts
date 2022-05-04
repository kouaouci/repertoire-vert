import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Friendship } from 'src/app/shared/friendship.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  REP_VERT_API = environment.url + 'api/';

  constructor(private http: HttpClient,) { }

  addFriend(userId: number, friendId: number): Observable<any> {
    const friendship: Friendship = {
      user: userId,
      friend: friendId
    };
    return this.http.post(this.REP_VERT_API + "friendRequests", friendship);
  }

  getFriendships(): Observable<any> {
    const userId = localStorage.getItem('repVertId');
    return this.http.get(this.REP_VERT_API + "users/" + userId + "/friendships");
  }

  acceptFriendRequest(friendshipId: number): Observable<any> {
    return this.http.put(this.REP_VERT_API + "friendships/" + friendshipId, {accepted: true});
  }

  deleteFriendRequest(friendshipId: number): Observable<any> {
    return this.http.delete(this.REP_VERT_API + "friendships/" + friendshipId);
  }
}
