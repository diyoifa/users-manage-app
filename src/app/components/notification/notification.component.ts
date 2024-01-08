import { Component, Input } from '@angular/core';
import {RouterLink } from '@angular/router';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() notification!: string;
  visible: boolean = true;
  // constructor(private location: Location) {}
  setVisibility() {
    // if(this.notification !== ''){
    //   this.visible = true;
    //   setTimeout(() => {
    //     this.visible = false;
    //     this.notification = '';
    //     this.setVisibility()
    //   }, 2000);
    // }else{
    //   this.visible = false;
    // }
    this.visible = !this.visible;
    window.location.reload();
  }
}
