import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainadminPage } from './mainadmin.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: MainadminPage
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
  declarations: [MainadminPage]
})
export class MainadminPageModule {}
