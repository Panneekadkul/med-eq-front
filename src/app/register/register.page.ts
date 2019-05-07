import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../model/request';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private request: Request = new Request();
  private url: Url = new Url();
  private positions;
  private departments;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = {};
    console.log("request = ", this.request);
    this.http.post(this.url.url + 'findAllDepartment', this.request)
      .subscribe(
        res => {
          this.departments = res;
          console.log('department = ', this.departments);
        }
      );

    this.http.post(this.url.url + 'findAllPosition', this.request)
      .subscribe(
        res => {
          this.positions = res;
          console.log('position = ', this.positions);
        }
      );
    loading.dismiss();
  }

  async register(empid, empname, empphone, empposition, empdepartment, emppass) {
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = { "empId": empid, "empName": empname, "empPhone": empphone, "empPosition": empposition, "empDepartment": empdepartment, "empPass": emppass };
    console.log("request = ", this.request);
    this.http.post(this.url.url + 'register', this.request)
      .subscribe(
        res => {
          if (res == true) {
            this.back();
          } else {
            alert("สมัครสมาชิกไม่สำเร็จ")
          }
          loading.dismiss();
        }
      );
  }

  back() {
    this.router.navigate(['login']);
  }
}
