import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../model/request';
import { LoadingController, Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  private request: Request = new Request();
  private url: Url = new Url();
  
  

  constructor(
    private service: ServiceService,
    private http: HttpClient,
    private router: Router,
    private loadingController: LoadingController,
    private event: Events
  ) {

  }

  async ngOnInit() {
    if (sessionStorage.getItem('header') == undefined || sessionStorage.getItem('header') == '' || sessionStorage.getItem('header') == 'null') {
      alert("กรุณาเข้าสู่ระบบ");
      this.router.navigate(['login']);
      return;
    }
    if (sessionStorage.getItem('header') != '99') {
      this.router.navigate(['main']);
      return;
    }
    this.event.publish('role', sessionStorage.getItem('header'));
    this.event.publish('name', sessionStorage.getItem('empName'));
    this.event.publish('position', sessionStorage.getItem('positionName'));
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.dismiss();
  }
  async register(typeId, typeName, typeTotal, typeNum,borrowing) {
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    
    
    loading.present();
    this.request.header = '';
    this.request.body = { "typeId": typeId,"typeName":typeName,"typeTotal":typeTotal, "typeNum":typeNum,"borrowing":borrowing};
    console.log("url = ", this.url.url);
    this.http.post(this.url.url + 'savetype', this.request)
      .subscribe(
        res => {
          if (res == true) {
            this.back();
            loading.dismiss();
          } else {
            alert("บันทึกไม่สำเร็จ");
            loading.dismiss();
          }
        }
      );
  }

  back() {
    this.router.navigate(['mainadmin']);
  }
}
