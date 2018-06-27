
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PushNotificationsService } from 'ng-push';
import { DataService } from '../../core/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { ISprint } from 'shared/interfaces';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.css']
})
export class CircularProgressBarComponent implements OnInit {
   circle: MyCanvasProgressBar;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('timer') timerElement: ElementRef;
  @ViewChild('stopButton') stopButton: ElementRef;

  public audio: HTMLAudioElement;

  private sprint: ISprint = {
    idUser: '',
    length: '',
    status: '',
    date: '',
    start: '',
    finish: '',
    description: ''
  };
  private isChecked: boolean ;
  constructor(private pushNotifications: PushNotificationsService,
              private dataService: DataService,
              private route: ActivatedRoute
            ) {

    this.audio = new Audio();

  }

  ngOnInit() {
    this.pushNotifications.requestPermission();
    this.audio.src = '../assets/beep.mp3';
    this.audio.load();
    console.log(this.canvasRef);
    console.log('init circular component');
    this.circle = new MyCanvasProgressBar(this.canvasRef.nativeElement, this);
    this.start();
     this.sprint.length = this.route.snapshot.params['length'];
     this.sprint.description = this.route.snapshot.params['desc'];
     this.isChecked = this.route.snapshot.params['isChecked'];
  }


  start() {
    this.circle.start();
  }

  notify() {
    const options = {
      body: `Your has ended.`,
      icon: '../assets/icon-128.png'
    };

    this.pushNotifications.create('Timeout!', options).subscribe(res => {
      if (res.event.type === 'click') {
        res.notification.close();
      }
    });
  }
}


  // --------------------------------------------------------------------------

class MyCanvasProgressBar {


  private _ctx: CanvasRenderingContext2D;
  private startTimer;
  private timeEnd: number;
  private second: number;
  private percent;
  private timeOut;

  constructor(private cnv, private component) {
    this.ctx = cnv.getContext('2d');
    this.timeEnd = 5;
    this.second = 0;
    this.percent = (this.second / this.timeEnd).toFixed(1);
    this.startTimer = true;
  }


get ctx() {
  return this._ctx;
}
set ctx(ctx) {
this._ctx = ctx;
}
  paint() {
    const w = this.cnv.width;
    const h = this.cnv.height;
    this.ctx.beginPath();

    this.ctx.arc(
      w / 2,
      h / 2,
      w / 3,
      (Math.PI / 180) * 270, ((((this.percent * 360)) - 90) / 180) * Math.PI);

    this.ctx.strokeStyle = '#FE2EC8';
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
  }

    start(): void {

    if (this.percent <=  1   && this.startTimer) {
      // this.second = Math.floor(this.second);
      this.timeOut =  setTimeout(this.start.bind(this), 1);
      this.second += 1;
    } else {
      this.component.notify();
      this.component.audio.play();
      clearTimeout(this.timeOut);
      this.startTimer = false;
    }
    this.percent = (this.second / (this.timeEnd)) / 100;
    this.component.timerElement.nativeElement.innerHTML = (this.percent * 100).toFixed(0) + ' % ' ;
    this.paint();

  }

  stop() {
    console.log(this.component.sprint.length);
    this.startTimer = !this.startTimer;
    if (this.startTimer && this.percent < 1 ) {
      this.timeOut =  setTimeout(this.start.bind(this), 1);
    } else {
      clearTimeout(this.timeOut);
    }

  }
}


