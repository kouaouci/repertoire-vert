import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivityTypeService } from 'src/app/services/activity-types/activity-type.service';
import { ActivityType } from 'src/app/shared/ActivityType.model';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss']
})
export class ThirdPageComponent implements OnInit {

  @Output() choiceEvent = new EventEmitter<{id: number, name: string}>();
  @Output() clickEvent = new EventEmitter<any>();

  chosenActiviteName: string;

  // Show add button
  showAdd = false;

  // Show search modal
  showSearch = false;
  filterTerm: string;

  // Option to add a new activity
  showAddOption = false;
  parentheses = '"';

  // If chosen activity is not from starter choices
  autreActiviteChosen = false;
  autreChosenActiviteId: number;
  autreChosenActiviteName: string;

  // Other activities
  autresActivites: ActivityType[] = [];

  displayedAutresActivites = []

  constructor(
    private activityTypeService: ActivityTypeService
  ) { }

  ngOnInit() {
    // Get all activity types
    this.getActivityTypes();
  }

  getActivityTypes() {
    // Initialize other activities list
      this.autresActivites = [];

    // Get other activities
    this.activityTypeService.getActivityTypes().then(result => {
      // Add activities to other activities list
      result.forEach(a => {
        if (a.id > 3 && a.approved) {
          this.autresActivites.push(a);
        }
      })
    });
  }

  handleChange(event) {
    
    const selectedId = event.target.value
    const selectedName = "";

    if (selectedId === '-1') {
      this.showAdd = true;
    }
    //this.chosenActiviteName = selected;

    this.choiceEvent.emit({id: selectedId, name: selectedName});
  }

  handleChangeOther(event) {

    this.autreChosenActiviteId = parseInt(event.target.value);
    this.autreActiviteChosen = true;

    // Find activity with same id
    let index = this.autresActivites.findIndex(a => {
      return a.id === this.autreChosenActiviteId;
    })

    // Set activity name if found, or new activity name
    if (index !== -1) {
      this.autreChosenActiviteName = this.autresActivites[index].name;
    } else {
      this.autreChosenActiviteName = this.filterTerm;
    }
    this.choiceEvent.emit({
      id: this.autreChosenActiviteId, 
      name: this.autreChosenActiviteName
    });
  }

  handleClick() {
    this.clickEvent.emit()
  }

  toggleSearch() {
    this.showAddOption = false;
    this.showSearch = !this.showSearch;
  }

  handleSearch(search: string) {
    
    this.filterTerm = search;

    // Search other activities that include search
    if (search !== "") {
      const results = this.autresActivites.filter(el => {
        return el.name.toLowerCase().includes(search.toLocaleLowerCase());
      });
  
      // Display search results
      this.displayedAutresActivites = results;
    }

    // Show create option if activity doesn't exist
    const result = this.autresActivites.filter((el) => {
      return el.name.toLowerCase() === search.toLowerCase();
    });

    if (result.length > 0 || search === "") {
      this.showAddOption = false;
    } else {
      this.showAddOption = true;
    }
  }
}
