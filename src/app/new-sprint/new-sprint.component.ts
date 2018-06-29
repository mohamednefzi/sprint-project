import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CircularProgressBarComponent } from './circular-progress-bar/circular-progress-bar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ISprint } from '../shared/interfaces';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent implements OnInit {
  @ViewChild('lengthSprint') length: ElementRef;
  @ViewChild('desc') description: ElementRef;
  @ViewChild('checkBox') checkBox: HTMLInputElement;

  choiseSelectBoxe = [
    { value: 1, name: 'Instant (5s)' },
    { value: 2, name: 'Very short (5min)' },
    { value: 3, name: 'Short (10min)' },
    { value: 4, name: 'Pomodoro (25min)' },
    { value: 5, name: 'Long (45min) ' },
    { value: 6, name: 'Very long (60min)' }
  ];

  // Sprint: ISprint = {
  //   idUser: '',
  //   length: '',
  //   status: '',
  //   date: '',
  //   start: '',
  //   finish: '',
  //   description: ''
  // };
  constructor(private router: Router) {}

  ngOnInit() {}

  onKey(event, divButton) {
    const textLength = event.target.value.length;
    if (textLength > 0) {
      divButton.classList.remove('disabled');
    } else {
      divButton.classList.add('disabled');
    }
  }

  start() {
    console.log('start new sprint');
    this.router.navigate([
      '/newSprintStart',
      {
        length: this.length.nativeElement.value,
        desc: this.description.nativeElement.value,
        isChecked: this.checkBox.checked
      }
    ]);
  }
}
