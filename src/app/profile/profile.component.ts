import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  emailStorage = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.emailStorage = localStorage.getItem('email');
  }

}
