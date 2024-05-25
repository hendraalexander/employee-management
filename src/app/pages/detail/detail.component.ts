import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyMaskModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  @Input() data: any;
  form = new FormGroup({
    id: new FormControl<number>(0, [Validators.required]),
    userName: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    birthDate: new FormControl<string>('', [Validators.required]),
    basicSalary: new FormControl<number>(0, [Validators.required]),
    status: new FormControl<string>('', [Validators.required]),
    group: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });
  formattedDate: any;

  ngOnInit(): void {
    console.log('ini di modal detail', this.data);
    this.formattedDate = formatDate(this.data.birthDate, 'dd-MMM-yyy', 'id-ID');

    this.form.setValue(this.data);
    this.form.disable();
  }
}
