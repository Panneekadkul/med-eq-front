import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Search2Pipe } from '../search2.pipe';
import { SearchPipe } from '../search.pipe';

@NgModule({
  declarations: [Search2Pipe,SearchPipe],
  imports: [
    CommonModule
  ],
  exports: [Search2Pipe,SearchPipe]
})
export class ShareModule { }
