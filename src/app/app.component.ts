import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public displayLogout: any = localStorage?.getItem('isUserLoggedIn');
  title = 'invoice';
  active = 1;
}
