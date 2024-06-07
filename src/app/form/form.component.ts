import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private _fb:FormBuilder,public userService:UserService){
    this.userService.userForm = this._fb.group({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl('',[Validators.required]),
      address:new FormControl('',Validators.required),
    })
  }


  onSubmit(){
    if(this.userService.userForm.invalid){
      return
    }
    console.log(this.userService.userForm.value)
    // this.addUser.emit(this.userForm.value);
    // this.userForm.reset();
    if(this.userService.editId){
      this.userService.updateUser(this.userService.editId,this.userService.userForm.value).then((res:any)=>{
        this.userService.userForm.reset();
        this.userService.editId=undefined;
        this.userService.getUsers()
        alert('user updated successfully')
      }).catch(error => {
        console.error(error)
      });
    }else{
      this.userService.createUser(this.userService.userForm.value).then((res:any)=>{
        this.userService.userForm.reset();
        this.userService.editId=undefined;
        this.userService.getUsers()
        alert('user created successfully')
      }).catch(error => {
        console.error(error)
      });
    }
  }
}
