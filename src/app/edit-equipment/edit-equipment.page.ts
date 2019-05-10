import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Request } from '../model/request';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.page.html',
  styleUrls: ['./edit-equipment.page.scss'],
})
export class EditEquipmentPage implements OnInit {

  private url: Url = new Url();
  private request: Request = new Request();
  private res;
  private typeId;

  constructor(
    private router: Router,
    private event: Events,
    private loadingController: LoadingController,
    private http: HttpClient,
    private service: ServiceService
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
    this.typeId = this.service.getData();
    this.request.header = "";
    this.request.body = { "typeId": this.typeId }
    await this.http.post(this.url.url + 'gettype', this.request)
      .subscribe(
        res => { 
          console.log(res);
          this.res = res;
        }
      );
      loading.dismiss();
  }
  async edit(typeName,typeTotal){
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    let typeId = this.typeId;
    this.request.header = '';
    this.request.body = {'typeName':typeName,'typeTotal':typeTotal,'typeId':typeId};
    console.log('req = ',this.request);
    this.http.post(this.url.url+'edittype',this.request)
      .subscribe(
        res => {
          console.log('res = ',res);
          if(res != null){
            this.router.navigate(['mainadmin']);
            loading.dismiss();
          }
        }
      );
  }

  back() {
    this.router.navigate(['mainadmin']);
  }
}