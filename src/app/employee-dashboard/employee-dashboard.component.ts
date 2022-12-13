import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit, AfterViewInit  {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addUserButton') addUserButton: any;
employeeForm: FormGroup



users: User[];
usersToDisplay: User[];



constructor(private fb:FormBuilder, private userService: UserService){
  this.employeeForm = fb.group({})
  this.users=[];
  this.usersToDisplay = this.users;
  
}
  ngAfterViewInit(): void {

  }

  addUser(){
    let user:User = {
      username : this.UserName.value,
      password : this.Password.value,
      email : this.Email.value,
      games : this.Games.value,
      company: this.fileInput.nativeElement.files[0]?.name,

    }
    this.userService.postUsers(user).subscribe((res)=>{
      this.users.unshift(res);
      this.clearForm();
    })
  }

  clearForm(){
    this.UserName.setValue('');
    this.Password.setValue('');
    this.Email.setValue('');
    this.Games.setValue('');
    this.fileInput.nativeElement.value='';
  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username:this.fb.control('',Validators.required),
      password:this.fb.control('',Validators.required),
      email:this.fb.control('',Validators.required),
      games :this.fb.control('',Validators.required),
      company:this.fb.control('',Validators.required),
    
    });
    
    this.userService.getUsers().subscribe((res) => {
      for (let user of res) {
        this.users.unshift(user);
      }
      this.usersToDisplay = this.users;
    });
  }

    public get UserName():FormControl{
      return this.employeeForm.get('username') as FormControl;
    }
    public get Password():FormControl{
      return this.employeeForm.get('password') as FormControl;
    }
    public get Email():FormControl{
      return this.employeeForm.get('email') as FormControl;
    }
    public get Games():FormControl{
      return this.employeeForm.get('games') as FormControl;
    }
    public get Company():FormControl{
      return this.employeeForm.get('company') as FormControl;
    }
    
    removeUser(event:any){
      this.users.forEach((val, index) =>{
        if (val.id === parseInt(event)){
          this.userService.deleteUsers(event).subscribe((res)=>{
            this.users.splice(index,1);
          })
        }
      })
    }

    editUser(event:any){
      this.users.forEach((val, ind) =>{
        if(val.id === event){
          this.setForm(val);
        }
       
        
      })
      this.removeUser(event);
      this.addUserButton.nativeElement.click(); 
    }
    setForm(use: User) {
      this.UserName.setValue(use.username);
      this.Password.setValue(use.password);
      this.Email.setValue(use.email);
      this.Games.setValue(use.games);
      this.fileInput.nativeElement.value = '';
    }
    type:string = "password";
    isText:boolean = false;
    eyeIcon:string = "fa-eye-slash";
    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
    }
    searchUsers(event:any){
      let filteredUsers:User[]=[];
      if(event === ''){
        this.usersToDisplay = this.users;
      }else{
        filteredUsers = this.users.filter((val,index)=>{
          let targetKey = val.username.toLowerCase();
          let searchKey = event.toLowerCase();
          return targetKey.includes(searchKey);
        });
        this.usersToDisplay = filteredUsers;
      }
    }
  }

