import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatPrefix, MatInput, MatButton, ReactiveFormsModule],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input matInput formControlName="name" placeholder="Enter your name" type="text" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput formControlName="email" placeholder="Enter your email" type="email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput formControlName="password" placeholder="Enter your password"/>
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input matInput formControlName="confirmPassword" placeholder="Confirm your password"/>
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">
          Creat Account
        </button>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account? 
        <a (click)="openSignInDialog()" class="text-blue-600 cursor-pointer">Sign In</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {

  store = inject(EcommerceStore);

  fb = inject(NonNullableFormBuilder);

  dialogRef = inject(MatDialogRef);

  data = inject<{checkout: boolean}>(MAT_DIALOG_DATA);

  matDialog = inject(MatDialog);

  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['john@t.com', Validators.required],
    password: ['password', Validators.required],
    confirmPassword: ['password', Validators.required],
  });

  signUp() {
    if(!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const {name, email, password} = this.signUpForm.value;  
    this.store.signUp({name, email, password, dialogId: this.dialogRef.id, checkout: this.data.checkout} as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, 
      { 
        disableClose: true,
        data: {
          checkout: this.data.checkout
        }
      }
    );
  }
}
