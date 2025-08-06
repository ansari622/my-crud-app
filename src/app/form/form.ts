import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userInt } from '../interfaces/userInt';
import { User } from '../service/user';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class Form {
  profileForm: FormGroup;
  isEditMode: boolean = false;
  userId: string = '';

  constructor(private userService: User, private router: Router, private route: ActivatedRoute) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$')]),
      role: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$')])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = id;

        this.userService.getuserUpdate(id).subscribe((data: userInt) => {
          this.profileForm.patchValue({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            dob: data.dob?.toString().slice(0, 10)
          });
        });
      }
    });
  }

  addUser() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      const userData: userInt = {
        id: this.isEditMode ? this.userId : Date.now().toString(),
        name: formValue.name ?? '',
        email: formValue.email ?? '',
        password: formValue.password ?? '',
        role: formValue.role ?? '',
        dob: formValue.dob ? new Date(formValue.dob) : new Date(),
      };

      if (this.isEditMode) {
        this.userService.updateUser(this.userId, userData).subscribe(() => {
          alert('User updated successfully');
          this.router.navigate(['/list']);
        });
      } else {
        this.userService.addUser(userData).subscribe(() => {
          alert('User added successfully');
          this.profileForm.reset();
        });
      }
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  get name() { return this.profileForm.get('name'); }
  get email() { return this.profileForm.get('email'); }
  get password() { return this.profileForm.get('password'); }
  get role() { return this.profileForm.get('role'); }
  get dob() { return this.profileForm.get('dob'); }
}
