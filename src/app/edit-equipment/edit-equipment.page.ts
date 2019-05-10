import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.page.html',
  styleUrls: ['./edit-equipment.page.scss'],
})
export class EditEquipmentPage implements OnInit {

  constructor(
    private router: Router,
    private event: Events
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem('header') == undefined || sessionStorage.getItem('header') == '' || sessionStorage.getItem('header') == 'null'){
      alert("กรุณาเข้าสู่ระบบ");
      this.router.navigate(['login']);
      return;
    }
    if(sessionStorage.getItem('header') != '99'){
      this.router.navigate(['main']);
      return;
    }
    this.event.publish('role', sessionStorage.getItem('header'));
    this.event.publish('name', sessionStorage.getItem('empName'));
    this.event.publish('position', sessionStorage.getItem('positionName'));
  }

}
