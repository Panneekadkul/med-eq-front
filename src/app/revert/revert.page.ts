import { Component, OnInit } from '@angular/core';
import { LoadingController, Events } from '@ionic/angular';
import { Request } from '../model/request';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url'
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';;

@Component({
  selector: 'app-revert',
  templateUrl: './revert.page.html',
  styleUrls: ['./revert.page.scss'],
})
export class RevertPage implements OnInit {

  private request: Request = new Request();
  private url: Url = new Url();
  private items;

  constructor(
    private loadingController: LoadingController,
    private http: HttpClient,
    private service: ServiceService,
    private router: Router,
    private event: Events
  ) { }

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

    loading.present();
    this.request.header = '';
    this.request.body = {};
    await this.http.post(this.url.url + "getrevert", this.request)
      .subscribe(
        res => {
          console.log("res", res);
          this.items = res;
          loading.dismiss();
        }
      );

  }

  async action(id,borRevert) {
    
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = { "borrowId": id ,'revertNum' : borRevert};
    console.log("borNum req = ", this.request);
    this.http.post(this.url.url + 'saverevert', this.request)
      .subscribe(
        res => {
          console.log(res);
          loading.dismiss();
          alert('บันทึกเรียบร้อยแล้ว');
          location.reload();
        }
      );
  }
}
