import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidator, PasswordPatternValidator } from '../../customValidation/custom-validation/custom-validation.component';

@Component({
  selector: 'task-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [CookieService]
})

export class LoginComponent{
  constructor(private auth: AuthService, private cookieService: CookieService, private formBuilder: FormBuilder){}
  hide = true
  loading = false
  cookieValue!: string
  loginForm!: FormGroup
  currentDate = new Date()
  rememberMe: boolean = false
  cookieExpiration = new Date(this.currentDate)

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', [Validators.required, PasswordPatternValidator]]
    })
    if (typeof window !== 'undefined'){
      const remember =  localStorage.getItem('rememberMe')
      this.rememberMe = remember == 'true'
    } 
    // Set cookies date 20 days from current date
    this.cookieExpiration.setDate(this.currentDate.getDate() + 20)
    const value = this.cookieService.get('token')
    this.cookieValue = value
    let token = value && JSON.parse(value)
    // If rememberMe is true, prefill loginForm
    this.rememberMe && this.loginForm.patchValue({email: token?.email, password: token?.password})
  }

  loginUser = async () => {
    this.loading = true
    this.handleCookies()
    await this.auth.SignIn(this.loginForm.value.email, this.loginForm.value.password)
    this.loading = false
  }
  loginWithGoggle = () => this.auth.SignInWithGoggle()

  handleCookies = () => {
    // convert loginForm values to a JSON string
    let token = JSON.stringify(this.loginForm.value);
    // If cookieValue is null and rememberMe is true, set cookies else remove cookies
    (!this.cookieValue && this.rememberMe) && this.cookieService.set('token', token, { expires: this.cookieExpiration });
    (this.cookieValue && !this.rememberMe) && this.cookieService.delete('token', '/')
  }

  handleCheckbox = () => {
    if (typeof window !== 'undefined'){
      if (!localStorage.getItem('rememberMe')) localStorage.setItem('rememberMe', `${!this.rememberMe}`)
      localStorage.setItem('rememberMe', `${!this.rememberMe}`)
      const remember =  localStorage.getItem('rememberMe')
      this.rememberMe = remember == 'true'
    }
  }
}
