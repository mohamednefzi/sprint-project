import { Component, OnInit } from '@angular/core';
import { ISprint } from '../../shared/interfaces';
import { DataService } from '../../core/data.service';
import { Router } from '@angular/router';
import { DataFilterService } from '../../core/data-filter.service';

@Component({
  selector: 'app-past-sprint',
  templateUrl: './past-sprint.component.html',
  styleUrls: ['./past-sprint.component.css']
})
export class PastSprintComponent implements OnInit {


  sprintList: ISprint[] = [];
  filteredSprintList: ISprint[] = [];
  constructor(private dataService: DataService,
              private dataFilter: DataFilterService,
              private router: Router) {}

  ngOnInit() {
    this.getAllSprint();
  }

  getAllSprint() {
    this.dataService.getAllSprints().subscribe((sprints: ISprint[]) => {
      this.sprintList = this.filteredSprintList = sprints;
    }, (err) => {console.log('error get all sprint in component')});
  }


delete(event: Event) {
  console.log('past sprint ts delete');
  event.preventDefault();
  this.dataService.deleteDataSprint()
  .subscribe((status: boolean) => {
    if (status) {
      console.log('delet ok ', status);
      this.router.navigate(['/']);
    } else {
      console.log('error delete past sprint ts');
    }
  })
}

filterChanged(filterText: string) {
  console.log('tab pas sprint Component . filter changed', filterText);

  if (filterText && this.sprintList) {
    console.log('tab pas sprint Component . filter changed', filterText);
    console.log('tab pas sprint Component . filter changed', this.sprintList);
    const props = ['length', 'status', 'date', 'start', 'finish', 'description'];
    this.filteredSprintList = this.dataFilter.filter(this.sprintList, props, filterText);
  }else {
    this.filteredSprintList = this.sprintList;
  }
}
}
