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
    this.request.body = {'borrowId': sessionStorage.getItem('username')};
    console.log("borrowId req = ", this.request);
    this.http.post(this.url.url + "getrevert", this.request)
      .subscribe(
        res => {
          console.log("res", res);
          let byteCharacters = atob(res['src']);

          let byteNumbers = new Array(byteCharacters.length);
          for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          this.items = res;
          loading.dismiss();
        }
      );
  }

  action(id) {
    console.log(id);
     alert('ºÑ¹·Ö¡àÃÕÂºÃéÍÂ¤èÐ');
     location.reload(id);
  }
}
