import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Url } from '../model/url';
import { Request } from '../model/request';
import { LoadingController, Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.page.html',

  styleUrls: ['./borrow.page.scss'],
})
export class BorrowPage implements OnInit {
  private request: Request = new Request();
  private url: Url = new Url();
  private typeFile;
  private typeName;
  private typeNum;
  private typeId;

  constructor(
    private service: ServiceService,
    private loadingController: LoadingController,
    private http: HttpClient,
    private router: Router,
    private event: Events
  ) {

  }

  async ngOnInit() {
    if(sessionStorage.getItem('header') == undefined || sessionStorage.getItem('header') == '' || sessionStorage.getItem('header') == 'null'){
      alert("กรุณาเข้าสู่ระบบ");
      this.router.navigate(['login']);
      return;
    }
    if(sessionStorage.getItem('header') == '99'){
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
    let typeId = this.service.getData();
    console.log("type id ", typeId);
    this.request.header = '';
    this.request.body = { "typeId": typeId };
    console.log("request = ", this.request);
    console.log("url = ", this.url.url);
    await this.http.post(this.url.url + 'gettype', this.request)
      .subscribe(
        res => {
          console.log(res);
          this.typeName = res['typeName'];
          this.typeFile = res['typeFile'];
          this.typeNum = res['typeNum'];
          this.typeId = res['typeId']
          loading.dismiss();
        }
      );
  }

  async borrow(borNum) {
    console.log("borNum = ", borNum);
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.request.header = '';
    this.request.body = { "borNum": borNum, "userId": sessionStorage.getItem('username'), 'typeId': this.typeId };
    console.log("borNum req = ", this.request);
    this.http.post(this.url.url + 'saveborrow', this.request)
      .subscribe(
        res => {
          console.log(res['src']);
          let byteCharacters = atob(res['src']);

          let byteNumbers = new Array(byteCharacters.length);
          for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          let byteArray = new Uint8Array(byteNumbers);

          let blob = new Blob([byteArray], { "type": "application/pdf" });

          if (navigator.msSaveBlob) {
            let filename = 'borrow.pdf';
            navigator.msSaveBlob(blob, filename);
          } else {
            let link = document.createElement("a");

            link.href = URL.createObjectURL(blob);

            link.setAttribute('visibility', 'hidden');
            link.download = 'borrow.pdf';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          loading.dismiss();
          this.cancel();
          }
      );
  }

  cancel() {
    this.router.navigate(['main']);
  }
}
