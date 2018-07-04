import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PushNotificationsService } from 'ng-push';
import { DataService } from '../../core/data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { ISprint } from '../../shared/interfaces';
import { Moment } from 'moment';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.css']
})
export class CircularProgressBarComponent implements OnInit {
  circle: MyCanvasProgressBar;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('timer') timerElement: ElementRef;
  @ViewChild('stopButton') stopButton: HTMLElement;

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
  private isChecked = false;
  constructor(
    private pushNotifications: PushNotificationsService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.audio = new Audio();
  }

  ngOnInit() {
    this.sprint.length = this.route.snapshot.params['length'];
    this.sprint.description = this.route.snapshot.params['desc'];
    this.isChecked = this.route.snapshot.params['isChecked'];
    if (this.isChecked) {
      console.log('is checked component class ngOn init', this.isChecked)
      this.pushNotifications.requestPermission();
      this.audio.src = '../assets/beep.mp3';
      this.audio.load();
    }
    console.log(this.canvasRef);
    this.circle = new MyCanvasProgressBar(this.canvasRef.nativeElement, this);
    this.start();
  }

  start() {
    const d = new Date();
    this.sprint.date =
      d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.sprint.start =
      d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    this.circle.start();
  }

  notify() {
    const options = {
      body: `Your has ended.`,
      icon: '../assets/icon-128.png'
    };
    if (this.isChecked) {
      this.pushNotifications.create('Timeout!', options).subscribe(res => {
        console.log('is checked component class', this.isChecked)
        if (res.event.type === 'click') {
          res.notification.close();
        }
      });
    }
  }

  save() {
    console.log(this.sprint.start);
    this.sprint.idUser = localStorage.getItem('id_token');
    const d = new Date();
    console.log(this.sprint);
    this.sprint.finish =
      d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    this.sprint.status = this.timerElement.nativeElement.innerHTML.includes(
      '100'
    )
      ? 'completed'
      : `canceled at (${this.timerElement.nativeElement.innerHTML})`;

    this.dataService
      .insertNewSprints(this.sprint)
      .subscribe((sprint: ISprint) => {
        if (sprint) {
          console.log('sprint save in the db');
          this.router.navigate(['/profile']);
        } else {
          console.log(' error : sprint save in the db');
          this.router.navigate(['/home']);
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
    this.timeEnd = this.convertTimeEnd();
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
      (Math.PI / 180) * 270,
      ((this.percent * 360 - 90) / 180) * Math.PI
    );

    this.ctx.strokeStyle = '#FE2EC8';
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
  }

  start(): void {
    if (this.percent <= 1 && this.startTimer) {
      this.timeOut = setTimeout(this.start.bind(this), 1);
      this.second += 1;
    } else {
      if (this.component.isChecked) {
        console.log('is checked my canvas class', this.component.isChecked)
        this.component.notify();
        this.component.audio.play();
      }

      clearTimeout(this.timeOut);
      this.startTimer = false;
      this.save();
    }
    this.percent = this.second / this.timeEnd / 100;
    this.component.timerElement.nativeElement.innerHTML =
      (this.percent * 100).toFixed(0) + ' % ';
    this.paint();
  }

  stop() {
    console.log(this.component.isChecked);
    this.startTimer = !this.startTimer;
    if (this.startTimer && this.percent < 1) {
      this.timeOut = setTimeout(this.start.bind(this), 1);
    } else {
      clearTimeout(this.timeOut);
    }
  }

  save() {
    this.component.save();
  }
  continue() {
    this.stop();
    console.log('continue');
    console.log(this.startTimer);
  }

  convertTimeEnd(): number {
    const length = this.component.sprint.length;
    if (length.includes('Instant')) {
      return 5;
    } else if (length.includes('Very short')) {
      return 5 * 60;
    } else if (length.includes('Short')) {
      return 10 * 60;
    } else if (length.includes('Pomodoro')) {
      return 25 * 60;
    } else if (length.includes('Long')) {
      return 45 * 60;
    } else if (length.includes('Very Long')) {
      return 60 * 60;
    }
  }
}
