import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../services/tenant.service';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,DialogModule,ToastModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers:[MessageService]
})
export class ProfileComponent implements OnInit{
  user:User = {} as User;
  isEditMode: boolean = false;
  photoUrl:string="";
  showChangePasswordDialog: boolean = false;
  constructor(
    private _messageService: MessageService,
    private _authService:AuthenticationService,
    private _tenantService:TenantService,
    private _userService:UserService
  ){
    _authService.user.subscribe((newUser) =>{
      this.user = newUser;
    });
  }

  ngOnInit(): void {
    this.updateInfoForm.get('name')?.setValue(this.user.name??"")
    this.updateInfoForm.get('email')?.setValue(this.user.email??"")
    this.updateInfoForm.get('phone')?.setValue(this.user.phone??"")
    this.updateInfoForm.get('role')?.setValue(this.user.role??"")
    this.updateInfoForm.get('age')?.setValue(this.user.age??0)
    this.updateInfoForm.get('address')?.setValue(this.user.address??"")
    this.updateInfoForm.get('website')?.setValue(this.user.website??"")
    this.updateInfoForm.disable();
  }

  toggleEditMode() {
    if(this.updateInfoForm.enabled){
      this.updateInfoForm.disable();
      this.isEditMode=false;
    }else{
      this.updateInfoForm.enable();
      this.isEditMode=true;
    }
  }

  updateInfoForm = new FormGroup({
    name : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    phone : new FormControl(''),
    role : new FormControl('',Validators.required),
    age : new FormControl(0),
    address : new FormControl(''),
    website : new FormControl('')
  });

  updatePasswordForm = new FormGroup({
    oldPassword : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    confirmPassword : new FormControl('',Validators.required),
  });

  uploadPhoto(event:any){
    console.log(event);
    const file: File = event.target.files[0];
      if (file){
        let formData = new FormData();
        formData.append('image',file);
        if(this.user.role == 'tenant' && this.user.id){
          this._tenantService.updateTenantImage(this.user.id,formData).subscribe({
            next:(res)=>{console.log(res)
              this.photoUrl = res.data.image;
              console.log(res);
            },
            error:(err)=>{
              console.log(err);
            }
          })
        }else if(this.user.role == 'user' && this.user.id){
          this._userService.updateUserImage(this.user.id,formData).subscribe({
            next:(res)=>{console.log(res)
              this.photoUrl = res.data.image;
              console.log(res);
            },
            error:(err)=>{
              console.log(err);
            }
          })
        }

      }
  }

  updateInfo(form:FormGroup){
    if(form.valid && this.user.id){
      console.log(form.value);
      
    }
  }

  updatePassword(form:FormGroup){
    if(form.valid){
      console.log(form.value);
      
    }
  }
  

}
