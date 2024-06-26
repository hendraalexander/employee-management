import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Service } from './services/services.service';
import { LoginComponent } from './pages/login/login.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzButtonModule,
    LoginComponent,
  ],
  providers: [NzModalService],
  // templateUrl: './layout-2/layout-2.component.html',
  // styleUrls: ['./layout-2/layout-2.component.css'],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  constructor(private service: Service, private modal: NzModalService) {
    this.isLoggedIn = this.service.isLoggedIn() ? true : false;
  }
  isCollapsed = true;

  logOut() {
    this.service.logout();
    window.location.href = '/login';
  }

  showModal(): void {
    this.modal.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are You Sure?',
      nzClosable: false,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => this.logOut(),
    });
  }
}
