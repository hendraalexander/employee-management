import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from '../../services/services.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  providers: [NzModalService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private service: Service,
    private router: Router,
    private modal: NzModalService
  ) {
    if (this.service.isLoggedIn()) {
      window.location.href = '/welcome';
    }
  }
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      if (await this.service.login(this.validateForm.value)) {
        console.log('login sukses');
        console.log(this.service.isLoggedIn());
        window.location.href = '/welcome';
      } else {
        this.modal.info({
          nzTitle: 'Error',
          nzContent: 'Invalid Username or Password!',
          nzClosable: true,
        });
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
