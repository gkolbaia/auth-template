import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(
    private _service: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._service.getUser().subscribe(
      res => {
        this.user = JSON.parse(JSON.stringify(res))
      },
      err => {
        console.log(err);
      }
    )
  }
  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
