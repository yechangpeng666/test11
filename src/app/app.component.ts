import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true }
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  myForm: FormGroup;//对应登录表单

  userName: AbstractControl//输入用户名控件

  password: AbstractControl

  name$: Observable<string>
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'userName': ['sss', Validators.compose([Validators.required, userNameValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password']
    this.name$ = this.userName.valueChanges;
  }
  onSubmit(value: any) {
    if (this.myForm.invalid) {
      alert("表单无效")
      return

    }
    console.log(value);
  }
}
