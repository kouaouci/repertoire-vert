import { SuperTabsConfig } from '@ionic-super-tabs/core';
import { UserNetworkPageComponent } from './../user-info/user-network/user-network.page';
import { UserActivitiesPage } from './../user-info/user-activities/user-activities.page';
import { UserFavoritesPage } from './../user-info/user-favorites/user-favorites.page';
import { UserStatsPage } from './../user-info/user-stats/user-stats.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/shared/user.model';
import { SuperTabs, SuperTabsContainer } from '@ionic-super-tabs/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Activity } from 'src/app/shared/activity.model';
import { Subscription } from 'rxjs';
import { ActivityService } from 'src/app/services/activities/activity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePageComponent implements OnInit {

  @ViewChild(SuperTabs) superTabs: SuperTabs;
  @ViewChild(SuperTabsContainer) superTabsContainer: SuperTabsContainer;
  @ViewChild(UserNetworkPageComponent) userNetworkPage: UserNetworkPageComponent;
  @ViewChild(UserFavoritesPage) userFavoritesPage: UserFavoritesPage;
  @ViewChild(UserActivitiesPage) userActivitiesPage: UserActivitiesPage;

  UserStatspage = UserStatsPage;
  UserFavspage = UserFavoritesPage;
  UserActivitiespage = UserActivitiesPage;
  Usernetpage = UserNetworkPageComponent;

  config: SuperTabsConfig = {
    sideMenu: 'left',
    //shortSwipeDuration: 1500,
    nativeSmoothScroll: false,
    transitionDuration: 0,
    allowElementScroll: true
  };

  user: User;

  // Activity lists
  activities: Activity[] = [];
  activitiesMonth: Activity[] = [];
  activitiesWeek: Activity[] = [];
  activitiesYear: Activity[] = [];

  // Activity subscription
  activitySub: Subscription;

  // Preferences
  showPreferences: boolean = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private activityService: ActivityService
  ) { }

  ngOnInit() {

    // Get activities
    this.getActivities();

    // Subscribe to activities updates
    this.activitySub = this.activityService.getActivitiesUpdateListener()
    .subscribe(activities => {

      // Get activities on update
      this.getActivities();
    });
  }

  ngOnDestroy(): void {
    this.activitySub.unsubscribe();
  }

  ionViewWillEnter() {
    this.superTabs.selectTab(0);

    // Load user info
    this.loadUser();

    // Load friends
    this.userNetworkPage.getFriends();

    // Load favorites
    this.userFavoritesPage.getFavoriteProducts();

    // Load activites
    this.getActivities();
  }

  loadUser() {
    // Get authenticated user
    this.user = this.authService.getAuthenticatedUser();

    // Get user info from DB, if error
    if (!this.user) {
      this.usersService.getUser(parseInt(localStorage.getItem('repVertId')))
      .subscribe(
        response => {
          this.user = response.user;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
  getActivities() {
    // Get user activities
    this.activities = this.activityService.getActivities();

    // Get user activities of week
    this.activitiesWeek = this.activityService.getActivitiesWeek();

    // Get user activities of month
    this.activitiesMonth = this.activityService.getActivitiesMonth();

    // Get user activities of year
    this.activitiesYear = this.activityService.getActivitiesYear();
  }

  togglePreferences() {
    this.showPreferences = !this.showPreferences;
  }

  disableSwipe() {
    this.superTabsContainer.swipeEnabled = false;
  }

  enableSwipe() {
    this.superTabsContainer.swipeEnabled = true;
  }
}


