import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchBookingPage } from './search-booking.page';
import { Search2Pipe } from '../search2.pipe';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: SearchBookingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [SearchBookingPage]
})
export class SearchBookingPageModule {}
