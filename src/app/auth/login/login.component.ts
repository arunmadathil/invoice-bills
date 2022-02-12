import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   formData: FormGroup =  new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
 }); ;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }
  onClickSubmit(data: any) {
    
    this.authService.login(this.formData.value,'api/login')
       .subscribe( () => { 
         if(data) this.router.navigate(['/invoice']); 
    });
 }
}
