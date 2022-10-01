import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  routerLinkActive="active";
  public loginform!:FormData;
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private route:Router) { }

 
  email = '';
  password = '';
  submitted = false;
 loginForm: FormGroup=new FormGroup({});

  

     
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
     
  get f() { return this.loginForm.controls; }
  baseUrl = 'http://localhost:3000/signupUsers';

  login() {
    this.http.get<any>(this.baseUrl)
    .subscribe(res=>{
      const u=res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      })
      if(u){
        alert("Login success");
        this.loginForm.reset();
        this.route.navigate(['/dashboard'])
      }else{
        alert("Invalid Credentials")
      }
    })
  }  
  
     
   
  
  

}