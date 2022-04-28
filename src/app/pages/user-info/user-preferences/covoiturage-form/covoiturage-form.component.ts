import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PreferenceService } from 'src/app/services/preferences/preference.service';
import { Preference } from 'src/app/shared/Preference.model';
import { UserPreference } from 'src/app/shared/UserPreference.model';

@Component({
  selector: 'app-covoiturage-form',
  templateUrl: './covoiturage-form.component.html',
  styleUrls: ['./covoiturage-form.component.scss']
})
export class CovoiturageFormComponent implements OnInit {

  // Preferences select
  preferences: Preference[];
  selectedPreference: number;

  // User preferences
  userPreferences: UserPreference[];

  constructor(
    private authService: AuthService,
    private preferenceService: PreferenceService) { }

  ngOnInit() {
    this.getPreferences();
  }

  getPreferences() {
    // Initialize preferences
    this.preferences = [];

    // Get all preferences
    this.preferenceService.getPreferences().then( result => {
      
      // Set preferences list
      this.preferences = result;

      // Set selected preference to first preference found
      this.selectedPreference = result[0].id;

      // Get user preferences
      this.getUserPreferences();
    });
  }

  getUserPreferences() {
    // Initialize user preferences
    this.userPreferences = [];

    // Get connected user id
    let userId = this.authService.getAuthenticatedUser().id;

    this.preferenceService.getUserPreferences(userId).then( result => {
      this.userPreferences = result;
    });
  }

  removeUserPreference(preferenceId: number) {
    this.preferenceService.deleteUserPreference(preferenceId).then( result => {
      if (result) {
        // Remove user preference from list
        this.userPreferences.splice(this.getUserPreferenceIndex(preferenceId), 1);
      }
    })
  }

  handleSubmit() {

    // Add new user preference, only if preference not in user preferences list
    if (!this.inUserPreferences(this.selectedPreference)) {
      // Get connected user id
      let userId = this.authService.getAuthenticatedUser().id;

      // Create new user preference
      let userPreference: UserPreference = {
        user: userId,
        preference: this.selectedPreference
      };

      // Add new user preference to user preferences list
      this.preferenceService.addUserPreference(userPreference).then( result => {
        // Set new user preference id
        userPreference.id = result.id;
        this.userPreferences.push(userPreference);
      });
    }
  }

  getUserPreferenceIndex(id: number): number {
    let userPreferenceId = this.userPreferences.findIndex(u => {
      return u.id === id;
    });

    return userPreferenceId;
  }

  inUserPreferences(preferenceId: number): boolean {

    let index = this.userPreferences.findIndex( u => {
      return u.preference === preferenceId;
    });

    return index !== -1;
  }
}
