import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private url: Url = new Url();
  private items;

  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private router: Router,
    private service: ServiceService,
    private loadingController: LoadingController,
    private event: Events
  ) { }

  ionViewWillEnter(){
    this.ngOnInit();
  }

  async ngOnInit() {
    if (sessionStorage.getItem('header') == undefined || sessionStorage.getItem('header') == '' || sessionStorage.getItem('header') == 'null') {
      alert("กรุณาเข้าสู่ระบบ");
      this.router.navigate(['login']);
      return;
    }
    if (sessionStorage.getItem('header') == '99') {
      this.router.navigate(['mainadmin']);
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
    this.http.post(this.url.url + "main", {})
      .subscribe(
        res => {
          console.log("res", res);
          this.items = res;
          loading.dismiss();
        }
      );
  }

  action(id, type) {
    console.log(id, type);
    this.service.setData(id);
    if (type == 'borrow') {
      this.router.navigate(['borrow']);
    } else if (type == 'booking') {
      this.router.navigate(['booking']);
    }
  }
}
