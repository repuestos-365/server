import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  constructor(public router: Router, public http: Http,private auth: AuthService) { }

  ngOnInit() {
  }

}
