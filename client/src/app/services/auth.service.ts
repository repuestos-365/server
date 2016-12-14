import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { myConfig } from './auth.config';

// Avoid name not found warnings
let Auth0Lock: any = require('auth0-lock').default;

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()

export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});
  // Configure Auth0
  auth0 = new Auth0({
    domain: myConfig.domain,
    clientID: myConfig.clientID,
    //callbackOnLocationHash: true,
    responseType: myConfig.responseType,
    callbackURL: myConfig.callbackURL,
  });
  
  constructor(private router: Router) {
    // Add callback for lock `authenticated` event
    /*this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      console.log('authResult');
    });*/
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public login(username, password) {
    // Call the show method to display the widget.
    //this.lock.show();
    this.auth0.login({
      connection: 'repuestos365DB',
      //connection: 'repuestos365DB-local',
      responseType: 'token',
      email: username,
      password: password,
    }, function(err) {
      if (err) alert("algo salió mal: " + err.message);
    });
  };

  public signUp(email, password) {
    this.auth0.signup({
      connection: 'repuestos365DB',
      //connection: 'repuestos365DB-local',      
      responseType: 'token',
      email: email,
      password: password,
    }, function(err) {
      if (err.message == 'the user already exists') {
        alert("algo salió mal: " + err.message);
        console.log(err);
      }
    });
  };

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert("algo salió mal: " + err.message);
    });
  };

  public facebookLogin() {
    this.auth0.login({
      connection: 'facebook'
    }, function(err) {
      if (err) alert("algo salió mal: " + err.message);
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/welcome');
  };
  
}
