import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-mainadmin',
  templateUrl: './mainadmin.page.html',
  styleUrls: ['./mainadmin.page.scss'],
})
export class MainadminPage implements OnInit {
  private url: Url = new Url();
  private items;

  constructor( private menu: MenuController,
    private http: HttpClient,
    private router: Router,
    private service: ServiceService,
    private loadingController: LoadingController,
    private event: Events
  ) { }


  async ngOnInit() {
    if(sessionStorage.getItem('header') == undefined || sessionStorage.getItem('header') == '' || sessionStorage.getItem('header') == 'null'){
      alert("กรุณาเข้าสู่ระบบ");
      this.router.navigate(['login']);
    }
    if(sessionStorage.getItem('header') != '99'){
      this.router.navigate(['main']);
    }
    this.event.publish('role', sessionStorage.getItem('header'));
    this.event.publish('name', sessionStorage.getItem('empName'));
    this.event.publish('position', sessionStorage.getItem('positionName'));
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    await this.http.post(this.url.url + "getalltype", {})
      .subscribe(
        res => {
          console.log("res", res);
          this.items = res;
          loading.dismiss();
        }
      );
  }

  action(id) {
    console.log(id);
    this.service.setData(id);
      this.router.navigate(['edit-equipment']);
  }
}
