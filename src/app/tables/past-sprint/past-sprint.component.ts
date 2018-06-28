import { Component, OnInit } from '@angular/core';
import { ISprint } from 'shared/interfaces';
import { DataService } from '../../core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-sprint',
  templateUrl: './past-sprint.component.html',
  styleUrls: ['./past-sprint.component.css']
})
export class PastSprintComponent implements OnInit {


  sprintList: ISprint[] = [];
  constructor(private dataService: DataService,
              private router: Router) {}

  ngOnInit() {
    this.getAllSprint();
  }

  getAllSprint() {
    this.dataService.getAllSprints().subscribe((sprints: ISprint[]) => {
      this.sprintList = sprints;
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
}
