import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
