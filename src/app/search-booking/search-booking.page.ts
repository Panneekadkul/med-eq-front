import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Url } from '../model/url';
import { Request } from '../model/request';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.page.html',
  styleUrls: ['./search-booking.page.scss'],
})
export class SearchBookingPage implements OnInit {
  private url: Url = new Url();
  private items;
  private request:Request = new Request();

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
    this.request.body = {'borrowId' : sessionStorage.getItem('username')};
    console.log("borrowId req = ", this.request);
    this.http.post(this.url.url + "getbooking", this.request)
      .subscribe(
        res => {
        console.log(res);
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
        }
        );
      }
  action(id) {
    console.log(id);
  }
}
