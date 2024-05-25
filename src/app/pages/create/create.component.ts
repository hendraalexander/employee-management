import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { Service } from '../../services/services.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzDatePickerModule,
    NzAutocompleteModule,
    CurrencyMaskModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  @Output() dataSubmitted = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Input() data: any;
  @Input() isUpdate: boolean = false;
  isVisible = false;
  isOkLoading = false;
  form: FormGroup = new FormGroup({
    userName: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    birthDate: new FormControl<string>('', [Validators.required]),
    basicSalary: new FormControl<number>(0, [Validators.required]),
    status: new FormControl<string>('', [Validators.required]),
    group: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });
  options: any[] = [
    { label: 'Group 1', value: 'Group 1' },
    { label: 'Group 2', value: 'Group 2' },
    { label: 'Group 3', value: 'Group 3' },
    { label: 'Group 4', value: 'Group 4' },
    { label: 'Group 5', value: 'Group 5' },
    { label: 'Group 6', value: 'Group 6' },
    { label: 'Group 7', value: 'Group 7' },
    { label: 'Group 8', value: 'Group 8' },
    { label: 'Group 9', value: 'Group 9' },
    { label: 'Group 10', value: 'Group 10' },
  ];
  filteredOptions: string[] = [];

  constructor(private service: Service) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    if (this.isUpdate && this.data) {
      this.form.addControl('id', new FormControl(undefined));
      this.form.patchValue(this.data);
      console.log(this.form.value);
    }
    console.log(this.form.controls['userName']);
  }

  submitForm() {
    console.log('username valid?', this.form.controls['email']);
    console.log('form : ', this.form.value);
    if (this.form.valid) {
      console.log('data received', this.form.value);
      this.isOkLoading = true;
      if (this.isUpdate) {
        this.service.update(this.form.value).subscribe(
          (res) => {
            console.log('update', res);
            this.isVisible = false;
            this.isOkLoading = false;
            this.dataSubmitted.emit(true);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.service.create(this.form.value).subscribe(
          (res) => {
            console.log('crated', res);
            this.isVisible = false;
            this.isOkLoading = false;
            this.dataSubmitted.emit(true);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      console.log('Not Valid');
    }
  }

  handleData(event: any) {}

  closeForm() {
    this.data = null;
    this.form.reset(this.data);
    this.close.emit(true);
  }

  onChange(event: any) {
    console.log(this.form.value);
    console.log(event);
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) > 0;

  onGroupChange(value: string): void {
    this.filteredOptions = this.options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(value?.toLowerCase()) !== -1
    );
  }
}
