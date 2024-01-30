import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const SpaceCheckValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
  let pattern = "^[a-zA-Z0-9_]*$"
  const regex = new RegExp(pattern)

  if (!control.value){
    return null
  }
  const valid = regex.test(control.value)
  return valid ? null : { invalidWord: true }
}

export const PasswordPatternValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
  let pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^(A-Za-z0-9)]).{8,32}$"
  const regex = new RegExp(pattern)

  if (!control.value){
    return null
  }
  const valid = regex.test(control.value)
  return valid ? null : { invalidPassword: true }
}

export const EmailValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
  let pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
  const regex = new RegExp(pattern)

  if (!control.value){
    return null
  }
  const valid = regex.test(control.value)
  return valid ? null : { invalidEmail: true }
}

export const PhoneNumberValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
  let pattern = "^(?=.*[0-9])\\d{11,15}$"
  const regex = new RegExp(pattern)

  if (!control.value){
    return null
  }
  const valid = regex.test(control.value);
  return valid ? null : { invalidPhoneNumber: true }
}

export const NumberValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
  let pattern = "^(?=.*[0-9])\\d{11,11}$"
  const regex = new RegExp(pattern)

  if (!control.value){
    return null
  }
  const valid = regex.test(control.value)
  return valid ? null : { invalidNumber: true }
}

export const PasswordMatchValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
  let password = control.get('password')
  let confirmPassword = control.get('confirmPassword')

  if (password?.value != confirmPassword?.value){
    confirmPassword?.setErrors({ passwordMatchError : true })
  }
  return null
}