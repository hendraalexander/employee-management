import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateComponent } from '../create/create.component';
import { Service } from '../../services/services.service';
import { DetailComponent } from '../detail/detail.component';
interface DataItem {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: Date;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [Service, NzModalService],
  imports: [
    DetailComponent,
    CreateComponent,
    NzModalModule,
    NzIconModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    CommonModule,
    NzFlexModule,
    NzTypographyModule,
    NzTableModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class WelcomeComponent implements OnInit {
  listOfColumn = [
    {
      title: 'User Name',
      compare: (a: DataItem, b: DataItem) =>
        a.userName.localeCompare(b.userName),
      priority: false,
    },
    {
      title: 'First Name',
      compare: (a: DataItem, b: DataItem) =>
        a.firstName.localeCompare(b.firstName),
      priority: 3,
    },
    {
      title: 'Last Name ',
      compare: (a: DataItem, b: DataItem) =>
        a.lastName.localeCompare(b.lastName),
      priority: 2,
    },
    {
      title: 'Status',
      compare: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
      priority: 1,
    },
    {
      title: 'Email',
      compare: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
      priority: 1,
    },
  ];
  listOfData: DataItem[] = [];
  filter = {
    userName: '',
    firstName: '',
    email: '',
  };
  isVisible = false;
  isDetailVisible = false;
  isOkLoading = false;
  isUpdate = false;
  selectedData: any;
  title: any;
  lastID = 0;

  constructor(private service: Service, private modal: NzModalService) {}

  ngOnInit() {
    this.getData(this.filter);
  }

  async getData(filter: any = undefined) {
    if (filter) {
      this.listOfData = await this.service.getData(filter);
    } else {
      this.listOfData = await this.service.getData();
    }
    console.log('datanya : ', this.listOfData);
  }

  handleChange(event: Event) {
    console.log(this.filter);
    this.getData(this.filter);
    // let query = [];
    // this.filter.userName ? query.push('userName=' + this.filter.userName) : '';
    // this.filter.firstName
    //   ? query.push('firstName=' + this.filter.firstName)
    //   : '';
    // this.filter.email ? query.push('email=' + this.filter.email) : '';
    // console.log(query.join('&'));
    // this.getData(query.join('&'));
  }

  clearFilter() {
    this.filter = {
      userName: '',
      firstName: '',
      email: '',
    };
    this.getData(this.filter);
  }

  showModal(): void {
    this.title = 'Add New Employee';
    this.isUpdate = false;
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('close');
    this.isVisible = false;
  }

  handleSave() {
    this.isVisible = false;
    this.getData(this.filter);
  }

  detail(data: any) {
    console.log('ini datanya ', data);
    this.selectedData = data;
    this.isDetailVisible = true;
  }

  closeDetail() {
    this.isDetailVisible = false;
  }

  update(data: any) {
    this.title = 'Edit Employee';
    this.selectedData = data;
    this.isUpdate = true;
    console.log('update ', this.selectedData);
    this.isVisible = true;
  }

  async delete(id: any) {
    console.log('delete ', id);
    await this.service.delete(id).subscribe(
      (res) => {
        console.log(res);
        console.log(`id : ${id}, sudah di delete!`);
        this.getData(this.filter);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this data?',
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
