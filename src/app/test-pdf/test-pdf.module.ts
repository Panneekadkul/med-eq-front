import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestPdfPage } from './test-pdf.page';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

const routes: Routes = [
  {
    path: '',
    component: TestPdfPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxExtendedPdfViewerModule
  ],
  declarations: [TestPdfPage]
})
export class TestPdfPageModule {}
