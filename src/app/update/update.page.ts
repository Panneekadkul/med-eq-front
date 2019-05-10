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
  private typeName;
  private typeNum;
  private typeId;

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
    loading.present();

    let typeId = this.service.getData();
    console.log("type id ", typeId);
    this.request.header = '';
    this.request.body = { "typeId": typeId };
    console.log("url = ", this.url.url);
    this.http.post(this.url.url + 'update', this.request)
      .subscribe(
        res => {
          console.log(res);
          this.typeName = res['typeName'];
          this.typeNum = res['typeNum'];
          this.typeId = res['typeId']
          loading.dismiss();
        }
      );
  }

  register() {
    this.router.navigate(['update']);
  }
}
