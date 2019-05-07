import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    private router: Router
  ) { }

  async ngOnInit() {
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = {};
    this.http.post(this.url.url + "getrevert", this.request)
      .subscribe(
        res => {
          console.log("res", res);
          this.items = res;
          loading.dismiss();
        }
      );
  }

  async action(id) {
    console.log("id = ", id);
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = { "borrowId": id};
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
