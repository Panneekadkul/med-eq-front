import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../model/request';
import { LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController
    
    ) { 

    }

  async ngOnInit() {
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
