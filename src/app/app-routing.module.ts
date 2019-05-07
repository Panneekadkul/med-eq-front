import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'borrow', loadChildren: './borrow/borrow.module#BorrowPageModule' },
  { path: 'booking', loadChildren: './booking/booking.module#BookingPageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'revert', loadChildren: './revert/revert.module#RevertPageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'update', loadChildren: './update/update.module#UpdatePageModule' },
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'search-booking', loadChildren: './search-booking/search-booking.module#SearchBookingPageModule' },
  { path: 'edit-equipment', loadChildren: './edit-equipment/edit-equipment.module#EditEquipmentPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
