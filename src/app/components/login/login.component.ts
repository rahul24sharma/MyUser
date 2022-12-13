import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type:string = "password";
  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";
  loginForm! : FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router){ }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //send the obj to database
    }else{
      //throw an error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.UserName === this.loginForm.value.username && a.Password === this.loginForm.value.password
      });
      if(user){
        alert("login Success!!");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("User not found")
      }
      
    })
    }
  }
  


