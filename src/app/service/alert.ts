import { NavigationStart, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<any>();
  private saveMessage = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.saveMessage) {
          this.saveMessage = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, saveMessage = false): void {
    this.saveMessage = saveMessage;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, saveMessage = false): void {
    this.saveMessage = saveMessage;
    this.subject.next({ type: 'error', text: message });
  }

  clear(): void {
    this.subject.next();
  }
}
