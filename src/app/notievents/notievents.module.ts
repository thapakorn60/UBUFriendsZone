import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotieventsPageRoutingModule } from './notievents-routing.module';

import { NotieventsPage } from './notievents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotieventsPageRoutingModule
  ],
  declarations: [NotieventsPage]
})
export class NotieventsPageModule {}
