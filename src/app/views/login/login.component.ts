import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {LoginI} from '../../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(private api:ApiService){ }

  onLogin(form: any){
    this.api.loginByEmail(form).subscribe(data =>
      console.log(data))
  }
}
