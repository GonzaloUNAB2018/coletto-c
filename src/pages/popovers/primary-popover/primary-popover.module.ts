import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimaryPopoverPage } from './primary-popover';

@NgModule({
  declarations: [
    PrimaryPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(PrimaryPopoverPage),
  ],
})
export class PrimaryPopoverPageModule {}
