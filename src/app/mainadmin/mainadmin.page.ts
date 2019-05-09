import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController
  ) { }


  async ngOnInit() {
    let loading = await this.loadingController.create({
      message: 'loading....',
      spinner: 'circles'
    });
    loading.present();
    this.http.post(this.url.url + "รอพัด", {})
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
