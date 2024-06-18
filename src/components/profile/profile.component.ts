import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../services/tenant.service';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,DialogModule,ToastModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers:[MessageService]
})
export class ProfileComponent implements OnInit,OnDestroy{
  user:User = {} as User;
  isEditMode: boolean = false;
  photoUrl:string="";
  showChangePasswordDialog: boolean = false;
  subscriptions:Subscription[]=[];
  constructor(
    private _messageService: MessageService,
    private _authService:AuthenticationService,
    private _tenantService:TenantService,
    private _userService:UserService
  ){
    
  }

  ngOnInit(): void {
    const sub =this._authService.user.subscribe((newUser) =>{
      this.user = newUser;
    });
    this.subscriptions.push(sub);
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
      this.updateInfoForm.get('role')?.disable();
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
    const file: File = event.target.files[0];
      if (file){
        let formData = new FormData();
        formData.append('image',file);
        if(this.user.role == 'tenant' && this.user._id){
          this._tenantService.updateTenantImage(this.user._id,formData).subscribe({
            next:(res)=>{console.log(res)
              this.photoUrl = res.data.image;
              this._messageService.add({ severity: 'success', summary: 'Success', detail: 'your photo is updated successfully' }); 
            },
            error:(err)=>{
              this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem updating your photo' });
            }
          })
        }else if(this.user.role == 'user' && this.user._id){
          this._userService.updateUserImage(this.user._id,formData).subscribe({
            next:(res)=>{console.log(res)
              this.photoUrl = res.data.image;
              this._messageService.add({ severity: 'success', summary: 'Success', detail: 'your photo is updated successfully' }); 
            },
            error:(err)=>{
              this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem updating your photo' });
            }
          })
        }

      }
  }

  updateInfo(form:FormGroup){
    if(form.valid && this.user._id){
      console.log(form.value);
      
    }
  }

  updatePassword(form:FormGroup){
    if(form.valid){
      console.log(form.value);
      
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
  

}
