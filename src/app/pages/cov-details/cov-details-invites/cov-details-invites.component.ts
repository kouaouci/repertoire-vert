import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CovoiturageFavoritesService } from 'src/app/services/covoiturage/covoiturage-favorites.service';
import { CovoiturageInvitationService } from 'src/app/services/covoiturage/covoiturage-invitation.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { CovFavorite } from 'src/app/shared/CovFavorite.model';
import { CovInvitation } from 'src/app/shared/CovInvitation.model';
import { Friendship } from 'src/app/shared/friendship.model';
import { Participation } from 'src/app/shared/participation.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-cov-details-invites',
  templateUrl: './cov-details-invites.component.html',
  styleUrls: ['./cov-details-invites.component.scss']
})
export class CovDetailsInvitesComponent implements OnInit {

  @Input() creatorId: number;
  @Input() covoiturageId: number;
  @Input() participations: Participation[];
  @Input() invitations: CovInvitation[];
  @Input() friends: Friendship[];
  @Input() favorites: CovFavorite[];

  filterTerm: string;

  constructor(
    private authService: AuthService,
    private invitationService: CovoiturageInvitationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {}

  checkAlreadyParticipating(participantId: number): string {
    // Check if friend or favorite is already participating in covoiturage
    let index = this.participations.findIndex(p => {    
      return p.participant.id === participantId;
    });

    if (index === -1) {
      return 'no'
    } else {
      if (this.participations[index].confirmed) {
        return 'confirmed';
      } else {
        return 'pending';
      }
    }
  }

  checkAlreadyInvited(friendId: number): boolean {
    // Check if friend or favorite is already invited
    let userId = parseInt(localStorage.getItem('repVertId'));
    let index = this.invitations.findIndex(i => {
      let user = i.user as User;
      let friend = i.friend as User;       
      return user.id === userId && friend.id === friendId;
    });

    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  inviteFriend(friend: User): void {
    // Create invitation
    let userId = this.authService.getAuthenticatedUser().id;
    let invitation: CovInvitation = {
      user: parseInt(userId),
      friend: friend.id,
      covoiturageId: this.covoiturageId
    }
    // Send invitation to DB
    this.invitationService.addInvitation(invitation).then(result => {
      if (result) {
        invitation.id = result;
        invitation.user = {
          id: userId,
          username: localStorage.getItem('username'),
          firstname: localStorage.getItem('firstname'),
          lastname: localStorage.getItem('lastname'),
        };
        invitation.friend = friend;
        this.invitations.push(invitation);
      }
    });
  }

  deleteInvitation(invitationId: number): void {
    this.invitationService.deleteInvitation(this.covoiturageId, invitationId)
    .then( result => {
      // Get invitation index in invitations list
      let index = this.invitations.findIndex(i => {
        return i.id === invitationId;
      });
      // Remove from list
      this.invitations.splice(index, 1);
    })
  }

  handleSearch(search: string): void {
    this.filterTerm = search;
  }
}
