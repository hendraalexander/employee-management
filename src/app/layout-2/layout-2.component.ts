import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-layout-2',
  standalone: true,
  templateUrl: './layout-2.component.html',
  styleUrls: ['./layout-2.component.css'],
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule,RouterOutlet, RouterLink, RouterLinkActive],
})
export class Layout2Component {
  isCollapsed = false;
}
