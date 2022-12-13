import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type:string = "password";
  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";
  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder, private http : HttpClient, private router:Router){ }

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      UserName:['',Validators.required],
      Email:['',Validators.required],
      Password:['',Validators.required],
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSignup(){
    if(this.signUpForm.valid){
      //perform logic for signup
    }else{
      ValidateForm.validateAllFormFields(this.signUpForm)
      //logic for throwoing error
    }
  }
 signUp(){
   this.http.post<any>("http://localhost:3000/signupUsers",this.signUpForm.value).subscribe(res=>{
     alert("Signup Successful!!")
     this.signUpForm.reset();
     this.router.navigate(['login'])
   })
 }
  
}
