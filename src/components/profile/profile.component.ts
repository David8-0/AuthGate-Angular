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
import { ValidationService } from '../../services/validation.service';

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
  photoUrl:string="assets/default.png";
  showChangePasswordDialog: boolean = false;
  subscriptions:Subscription[]=[];
  showChangePasswordErrors:boolean = false;
  constructor(
    private _messageService: MessageService,
    private _authService:AuthenticationService,
    private _tenantService:TenantService,
    private _userService:UserService,
    private _validationService:ValidationService
  ){
    this.user = this._authService.user.value;
    //console.log(this.user);
    // console.log(this._authService.user.value._id);

  }

  ngOnInit(): void {
    
    const sub =this._authService.user.subscribe((newUser) =>{
      this.user = newUser;
      if(this.user?.image?.length){
        this.photoUrl = this.user.image;
      }
      
      
    this.updateInfoForm.get('name')?.setValue(this.user.name??"")
    this.updateInfoForm.get('email')?.setValue(this.user.email??"")
    this.updateInfoForm.get('phone')?.setValue(this.user.phone??"")
    this.updateInfoForm.get('role')?.setValue(this.user.role??"")
    if(this.user.role != 'tenant' && this.user.role){
      this.updateInfoForm.get('age')?.setValue(this.user.age??0)
    }
    this.updateInfoForm.get('address')?.setValue(this.user.address??"")
    this.updateInfoForm.get('website')?.setValue(this.user.website??"")
    this.updateInfoForm.disable();
    });
    this.subscriptions.push(sub);
    
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
    email : new FormControl('',[Validators.required,Validators.email]),
    phone : new FormControl('',Validators.pattern(/^(?:\+20|0)?1[0125]\d{8}$/)),
    role : new FormControl('',Validators.required),
    age : new FormControl(15,[Validators.min(13),Validators.max(100)]),
    address : new FormControl(''),
    website : new FormControl('',Validators.pattern(/^www\.[a-zA-Z0-9-]+(\.[a-zA-Z]+)+$/))
  });

  updatePasswordForm = new FormGroup({
    oldPassword : new FormControl('',Validators.required),
    newPassword : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmNewPassword : new FormControl('',Validators.required),
  },{validators: this._validationService.passwordMatchValidator('newPassword','confirmNewPassword')});

  uploadPhoto(event:any){
    const file: File = event.target.files[0];
      if (file){
        let formData = new FormData();
        formData.append('image',file);
        if(this.user.role == 'tenant' && this.user._id){
          this._tenantService.updateTenantImage(this.user._id,formData).subscribe({
            next:(res)=>{console.log(res)
              this._authService.setUser(res.data);
              this._messageService.add({ severity: 'success', summary: 'Success', detail: 'your photo is updated successfully' }); 
            },
            error:(err)=>{
              this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem updating your photo' });
            }
          })
        }else if((this.user.role == 'user' ||this.user.role == 'admin') && this.user._id){
          this._userService.updateUserImage(this.user._id,formData).subscribe({
            next:(res)=>{console.log(res)
              this._authService.setUser(res.data);
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
      if((this.user.role == 'user' || this.user.role == 'admin')  && this.user._id){
        this._userService.updateUser(form.value).subscribe({
          next:res=>{
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'your data is updated successfully' });
            this._authService.user.next(res.data)
          },
          error:(err)=>{
            console.log(err);
            
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem updating your data' });
          }
        });
      }else if (this.user.role == 'tenant'){
        this._tenantService.updateTenant(form.value).subscribe({
          next:res=>{
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'your data is updated successfully' });
            this._authService.user.next(res.data)
          },
          error:(err)=>{
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem updating your data' });
          }
        });
      }
      
    }else{
      console.log(form.value);
    }
  }

  updatePassword(form:FormGroup){
    if(form.valid && this.user._id){
      console.log(form.value);
      
      if((this.user.role == 'user' || this.user.role == 'admin')  && this.user._id){
        this._userService.updatePassword(form.value).subscribe({
          next:res=>{
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'your password is updated successfully' });
          },
          error:(err)=>{
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem updating your password' });
          }
        });
      }else if (this.user.role == 'tenant'){
        this._tenantService.updatePassword(form.value).subscribe({
          next:res=>{
            console.log(res);
            
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'your password is updated successfully' });
          },
          error:(err)=>{
            console.log(err);
            
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem updating your password' });
          }
        });
      }
      this.showChangePasswordDialog= false;
    }else{
      this.showChangePasswordErrors=true;
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
  

}
