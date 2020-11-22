import { AlertService } from './../../service/alert';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        const msgElement = document.getElementById('message');
        switch (message && message.type) {
          case 'success':
            msgElement.classList.add('alert alert-success');
            // message.cssClass = 'alert alert-success';
            break;
          case 'error':
            msgElement.classList.add('alert alert-danger');
            // message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
