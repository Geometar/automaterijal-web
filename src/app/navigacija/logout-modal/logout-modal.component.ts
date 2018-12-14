import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutModalComponent>,
    private router: Router,
    private loginServis: LoginService) {}

  ngOnInit() {
  }

  logout() {
    this.loginServis.logout();
    this.router.navigateByUrl('naslovna');
    this.dialogRef.close();
  }

  ostaniUlogovan() {
    this.dialogRef.close();
  }
}
