import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {LoginI} from '../../models/login.interface';
import {ResponseI} from '../../models/response.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  errorOccurred: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void{
    this.checkLocalStorage
  }

  checkLocalStorage(){
    if(localStorage.getItem("token")){
      this.router.navigate(["dashboard"])
    }
  }

  constructor(private api:ApiService, private router:Router){ }

  onLogin(form: any){
    this.api.loginByEmail(form).subscribe(data =>{
      
      let dataResponse:ResponseI = data
      if(dataResponse.tokenType == "Bearer"){
        localStorage.setItem("token",dataResponse.accessToken)
        this.router.navigate(['dashboard'])
      }
    },(error)=>{
      this.errorOccurred=true
      this.errorMessage=error
    })
  }
}
