import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-sprint',
  templateUrl: './past-sprint.component.html',
  styleUrls: ['./past-sprint.component.css']
})
export class PastSprintComponent implements OnInit {
  test = [{'length': 'name 1', 'status': 'status 1', 'date' : 'date 1', 'finish' :'finish 1', 'desc': 'desc 1'},
  {'length': 'name 2', 'status': 'status 2', 'date' : 'date 2', 'start': 'start 2' , 'finish' : 'finish 1', 'desc': 'desc 1'}];


  constructor() { }

  ngOnInit() {
  }

}


