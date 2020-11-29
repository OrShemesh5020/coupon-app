import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText = 'ok';
  @Input() btnCancelText = 'cancel';
  constructor() { }

  ngOnInit(): void {
  }

}
