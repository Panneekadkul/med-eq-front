import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RevertPage } from './revert.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: RevertPage
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
  declarations: [RevertPage]
})
export class RevertPageModule {}
