import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  model: {filter: string} = {filter: null};
  @Output()
  changed: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  filterChanged(event) {
    event.preventDefault();
    console.log('filter Component . filter changed');
    this.changed.emit(this.model.filter);
  }
}
