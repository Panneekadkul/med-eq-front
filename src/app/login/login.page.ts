import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, Events } from '@ionic/angular';
import { Url } from '../model/url';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private request: Request = new Request();
  private url: Url = new Url();

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingController: LoadingController,
    private event: Events
  ) { }

  ngOnInit() {
  }

  async login(username, password) {
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = { "userName": username, "password": password };
    console.log("request = ", this.request);
    console.log("url = ", this.url.url);
    this.http.post(this.url.url + 'login', this.request)
      .subscribe(
        res => {
          console.log("res = ", res);
          if (res == null) {
            alert('เข้าสู่ระบบไม่สำเร็จ')
          } else {
            sessionStorage.setItem('header', res['positionId']);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('empName', res['empName']);
            sessionStorage.setItem('positionName', res['positionName']);
            this.event.publish('role', sessionStorage.getItem('header'));
            this.event.publish('name', sessionStorage.getItem('empName'));
            this.event.publish('position', sessionStorage.getItem('positionName'));
            if (sessionStorage.getItem('header') == '99') {
              this.router.navigate(['mainadmin']);
            } else {
              this.router.navigate(['main']);
            }
          }
          loading.dismiss();
        }
      );
  }

  register() {
    this.router.navigate(['register']);
  }
}
