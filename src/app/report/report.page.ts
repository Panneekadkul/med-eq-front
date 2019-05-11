import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Request } from '../model/request';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  private request: Request = new Request();
  private url: Url = new Url();


  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private http: HttpClient,
    private event: Events) { }



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
  }

  async getreport(report) {
    console.log("report = ", report);
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    let reportService;
    let reportName;
    if(report == '03'){
      reportService = 'reporttype';
      reportName = 'รายงานอุปกรณ์ที่ไม่เพียงพอ.pdf';
    } else if(report == '02'){
      reportService = 'reportlate';
      reportName = 'รายงานหน่วยงานค้างอุปกรณ์.pdf';
    } else if(report == '01'){
      reportService = 'reportstatus';
      reportName = 'รายงานสถานะอุปกรณ์.pdf';
    } else {
      alert('กรุณาเลือกรายงาน');
      loading.dismiss();
      return;
    }
    this.request.header = '';
    this.request.body = { "username": sessionStorage.getItem('username') };
    console.log(this.request);
    this.http.post(this.url.url + reportService, this.request)
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
            let filename = reportName;
            navigator.msSaveBlob(blob, filename);
          } else {
            let link = document.createElement("a");

            link.href = URL.createObjectURL(blob);

            link.setAttribute('visibility', 'hidden');
            link.download = reportName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          loading.dismiss();
        }
      );
  }
}


