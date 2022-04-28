import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activities/activity.service';

@Component({
  selector: 'app-empreinte-co2',
  templateUrl: './empreinte-co2.component.html',
  styleUrls: ['./empreinte-co2.component.scss']
})
export class EmpreinteCo2Component implements OnInit {

  date = "01.01.2021-31.03.2021";

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  handleClick() {
    if (this.activityService.getCurrentActivity() !== null) {
      this.router.navigate(['/tabs/co2/home']);
    } else {
      this.router.navigate(['/tabs/form-options-co2']);
    }
  }
}
