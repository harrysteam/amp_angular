import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user = {
    email: '',
    password: ''
  }
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.user.email == '' || this.user.password == '') {
      alert("Please don't leave any field blank");
      return;
    }
    var params = {
      email: this.user.email,
      pwd: this.user.password
    }
    this.auth.login(params).subscribe((success) => {
      alert("Login Successful");
    }, (error) => {
      alert("wrong email or password.")
    })
  }

}
