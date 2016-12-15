import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Email } from '../model/email.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiRestService {
  //private baseUrl: string = 'http://localhost:8080';
  private baseUrl: string = 'http://nodejs-mongodb-example-jairo-perez.44fs.preview.openshiftapps.com';
  constructor(private http: Http) { }
  //: Observable<Email[]>
  sendEmail(body: any) {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request options
    console.log('body');
    console.log(body);
    console.log('options');
    console.log(options);
    /*return this.http.post('http://localhost:8080/send-email', body, options) // ...using post request
    .map((res:Response) => {
      console.log('res');
      console.log(res);
      res.json();
    }) // ...and calling .json() on the response to returequest
    .catch((error:any) => Observable.throw(console.log(error.json().error) || console.log('Server error'))); //...errors if any*/

    return this.http.post(this.baseUrl+'/api/send-email-contactus', body, options)
    .subscribe((data:any) => {
      console.log('data');
      console.log(data);
      alert('Enviado con Exito');
    });
  }

}
