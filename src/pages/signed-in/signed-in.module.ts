import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignedInPage } from './signed-in';

@NgModule({
  declarations: [
    SignedInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignedInPage),
  ],
})
export class SignedInPageModule {}
