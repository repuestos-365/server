import { Component, OnInit } from '@angular/core';

import { ApiRestService } from '../services/api-rest.service';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {

  constructor(private apiRest: ApiRestService) { }

  ngOnInit() {
  }

  sendEmail(name, email, subject, message){
    let emailConfig = {
      name: name,
      email: email,
      subject: subject,
      message: message
    }
    console.log(emailConfig);
    if (emailConfig) {
      this.apiRest.sendEmail(emailConfig);
    }
  }

}
