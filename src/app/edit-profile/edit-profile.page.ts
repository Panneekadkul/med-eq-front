import { Component, OnInit } from '@angular/core';
import { Url } from '../model/url';
import { Request } from '../model/request';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private url: Url = new Url();
  private request: Request = new Request();
  private res;
  private positions;
  private departments;
  

  constructor(
    private loadingController: LoadingController,
    private http: HttpClient,
    private router: Router
  ) { }

  async ngOnInit() {
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = "";
    this.request.body = { "userName": sessionStorage.getItem('username') }
    this.http.post(this.url.url + 'getprofile', this.request)
      .subscribe(
        res => {
          console.log(res);
          this.res = res;
        }
      );

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

  async edit(empname,empphone,empposition,empdepartment){
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = {'empId':sessionStorage.getItem('username'),'empName':empname,'empPhone':empphone,'empposition':empposition,'empdepartment':empdepartment};
    this.http.post(this.url.url+'editprofile',this.request)
      .subscribe(
        res => {
          if(res == 'true'){
            this.router.navigate(['main']);
          }
        }
      );
  }

  back() {
    this.router.navigate(['main']);
  }
}